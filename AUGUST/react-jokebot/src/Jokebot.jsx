import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // Import the CSS file

const Jokebot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Initial message
    setMessages([{ text: "Hello! Myself Jokebot!", type: "left" }]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user's message
    setMessages([...messages, { text: input, type: "right" }]);

    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      setMessages([
        ...messages,
        { text: input, type: "right" },
        { text: response.data.value, type: "left" },
      ]);
    } catch (error) {
      setMessages([
        ...messages,
        { text: input, type: "right" },
        { text: `Sorry, I couldn't get a response. Error: ${error.message}`, type: "left" },
      ]);
    }

    setInput('');
  };

  return (
    <div id="main">
      <h2>BOT</h2>
      <div id="msg_area">
        {messages.map((msg, index) => (
          <div key={index} className={msg.type === "left" ? "msgCon1" : "msgCon2"}>
            <div className={msg.type}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div id="input">
        <input
          type="text"
          placeholder="New Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button id="send" onClick={handleSend}>Send <i className="fa fa-paper-plane"></i></button>
      </div>
    </div>
  );
};

export default Jokebot;
