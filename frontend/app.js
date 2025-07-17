/* TrustSeal FE MVP */
(function(){
const cfg = window.TS_CONFIG || {};
if(!cfg.STRIPE_PK){console.error('Missing STRIPE_PK in config.js');}
if(!cfg.BACKEND_BASE){console.error('Missing BACKEND_BASE in config.js');}

const stripe = Stripe(cfg.STRIPE_PK);

let clientSecret=null,currentHash=null,elements=null,paymentRequest=null,prButtonEl=null;
const $=s=>document.querySelector(s);
function log(m){const st=$('#status');st.innerHTML+=m+'<br>';st.scrollTop=st.scrollHeight;}
function clearLog(){const st=$('#status');st.innerHTML='';}

async function sha256File(file){
 const buf=await file.arrayBuffer();
 const dig=await crypto.subtle.digest('SHA-256',buf);
 return [...new Uint8Array(dig)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

function mountPaymentUI(){
 $('#paymentElementWrap').style.display='block';
 elements = stripe.elements({clientSecret});
 const paymentEl = elements.create('payment');
 paymentEl.mount('#payment-element');
 paymentRequest = stripe.paymentRequest({
   country:'US',currency:'usd',
   total:{label:'TrustSeal Proof',amount:199},
   requestPayerEmail:true,
 });
 paymentRequest.canMakePayment().then(res=>{
   if(res){
     prButtonEl = elements.create('paymentRequestButton',{paymentRequest});
     prButtonEl.mount('#payment-request-button');
   }else{
     document.getElementById('payment-request-button').style.display='none';
   }
 });
}

$('#startBtn').addEventListener('click', async ()=>{
 clearLog();
 const file=$('#fileInput').files[0];
 const email=$('#email').value.trim();
 const svc=$('#serviceType').value;
 if(!file||!email){log('Need file + email');return;}
 log('Hashing...');
 currentHash=await sha256File(file);
 log('SHA256='+currentHash);

 log('Create pending record...');
 await fetch(`${cfg.BACKEND_BASE}/api/hash`,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({hash:currentHash,email,service_type:svc})
 }).then(r=>r.json()).then(j=>{if(j.error)throw new Error(j.error)});

 log('Create Stripe PI...');
 const piRes=await fetch(`${cfg.BACKEND_BASE}/api/pay/create-intent`,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({hash:currentHash,email,service_type:svc})
 }).then(r=>r.json());
 if(piRes.error){log('PI error:'+piRes.error);return;}
 clientSecret=piRes.clientSecret;
 mountPaymentUI();
});

$('#confirmPayBtn').addEventListener('click', async ()=>{
 log('Confirming payment...');
 const {error} = await stripe.confirmPayment({
   elements,
   confirmParams:{return_url:window.location.href},
   redirect:'if_required'
 });
 if(error){log('Pay error:'+error.message);return;}
 log('Payment submitted. Waiting for webhook + chain...');
 pollChain();
});

async function pollChain(){
 log('Polling lookup...');
 for(let i=0;i<60;i++){
  await new Promise(r=>setTimeout(r,2000));
  const res=await fetch(`${cfg.BACKEND_BASE}/api/lookup/${currentHash}`);
  if(res.ok){
    const j=await res.json();
    log('On-chain!');
    $('#status').innerHTML+=`<br>✅ <a target=_blank href="${j.tx_link}">View VeChain TX</a>`;
    return;
  }
  log('...waiting');
 }
 log('Timed out. POST /api/vechain/write manually to force.');
}
})();