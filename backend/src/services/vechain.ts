import axios from 'axios';
import { cry, Transaction } from 'thor-devkit';
import { ENV } from '../env';

// NOTE: for MVP we assume testnet chainTag 0x27. Adjust if needed.
const TESTNET_CHAIN_TAG = 0x27;

function getPrivateKey(): Buffer {
  const pk = ENV.vePk.trim();
  if (/^(0x)?[0-9a-fA-F]{64}$/.test(pk)) {
    return Buffer.from(pk.replace(/^0x/, ''), 'hex');
  }
  throw new Error('Please supply raw 64-hex private key in VECHAIN_PRIVATE_KEY. (Mnemonic not auto-derived in MVP.)');
}

export async function writeHashToVeChain(public_hash: string): Promise<{ txid: string; blockTime: string; }>
{
  const pk = getPrivateKey();
  const signer = new cry.Signer(pk);
  const from = ENV.veFrom.toLowerCase();
  const to = from; // self-send

  // get best block for blockRef
  const { data: bestBlock } = await axios.get(`${ENV.veNode}/blocks/best`);
  const blockRef = bestBlock.id.slice(0, 18); // 9 bytes hex

  const dataHex = '0x54535331' + public_hash.toLowerCase(); // 'TSS1' + hash

  const body: Transaction.Body = {
    chainTag: TESTNET_CHAIN_TAG,
    blockRef,
    expiration: 32,
    clauses: [{ to, value: '0x0', data: dataHex }],
    gasPriceCoef: 0,
    gas: ENV.veGas,
    dependsOn: null,
    nonce: Number(Date.now() & 0xffffffff),
  } as any;

  const tx = new Transaction(body);
  const sig = signer.sign(tx.signingHash());
  const raw = tx.encode(sig);

  const broadcast = await axios.post(`${ENV.veNode}/transactions`, '0x' + raw.toString('hex'));
  const txid = broadcast.data.id ?? broadcast.data;

  // poll for inclusion
  let blockTime = '';
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1500));
    try {
      const { data: txData } = await axios.get(`${ENV.veNode}/transactions/${txid}`);
      if (txData?.meta?.blockTimestamp) {
        blockTime = new Date(txData.meta.blockTimestamp * 1000).toISOString();
        break;
      }
    } catch {}
  }
  if (!blockTime) blockTime = new Date().toISOString();
  return { txid, blockTime };
}
