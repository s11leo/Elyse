import React from 'react';

const clientId = '1252908504566730752';
const redirectUri = 'http://localhost:3000/auth/discord/callback'; // Измените на URL вашего фронтенда

function DiscordLogin() {
    const handleLogin = () => {
      const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20guilds%20guilds.join%20messages.read%20messages.write`;
      window.location.href = oauthUrl;
    };
  
    return <button onClick={handleLogin}>Login with Discord</button>;
  }
  
  export default DiscordLogin;