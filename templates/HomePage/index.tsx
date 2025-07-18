import React from 'react';

const HomePage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to TrustSeal</h1>
      <p>Your project is now set up and ready to use!</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Next Steps:</h2>
        <ul>
          <li>Configure your environment variables in Vercel</li>
          <li>Deploy your backend to a Node.js hosting service</li>
          <li>Update the NEXT_PUBLIC_API_URL to point to your deployed backend</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;