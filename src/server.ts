import { createApp } from './app';
import { ENV } from './env';

const app = createApp();
app.listen(ENV.port, () => {
  console.log(`TrustSeal backend on :${ENV.port}`);
});
