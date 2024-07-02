const express = require('express');
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
const cors = require('cors');

const app = express();
const port = 3001;

const clientId = '1252908504566730752';
const clientSecret = './.clientSecret';
const redirectUri = 'http://localhost:3000/auth/discord/callback';
const channelId = '1249343142650712189'; // Укажите ID канала вашего сервера

app.use(express.json());
app.use(cors());

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

app.get('/auth/discord/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = tokenResponse.data;

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.json({ access_token, user: userResponse.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const channel = await discordClient.channels.fetch(channelId);
    const messages = await channel.messages.fetch({ limit: 10 });
    res.json(messages.map(msg => ({ author: msg.author.username, content: msg.content })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { content } = req.body;
    const channel = await discordClient.channels.fetch(channelId);
    const message = await channel.send(content);
    res.json({ author: message.author.username, content: message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.login('./.token');
