import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DiscordChat({ token }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/messages', { content: newMessage });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div className="chat-window" style={{ maxHeight: '400px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.author}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%', marginRight: '10px' }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default DiscordChat;