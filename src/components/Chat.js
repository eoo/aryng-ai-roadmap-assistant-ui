import React, { useState } from 'react';
import './Chat.css';
import ReactMarkdown from 'react-markdown';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

function Chat({ email }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [reset, setReset] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setReset(false);
    
    console.log(newMessages)
    const res = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message: input, reset })
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
  };

  const handleReset = () => {
    setMessages([]);
    setReset(true);
  };

  return (
    <div className="chat-container flex flex-col h-screen p-4 bg-gray-50">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-2xl ${
              msg.role === 'user' ? 'bg-[#019aa8] text-white self-end' : 'bg-white text-black self-start border'
            }`}
          >
            {msg.role === 'assistant' ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              <span>{msg.content}</span>
            )}
          </div>
        ))}
      </div>
  
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(e)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button onClick={sendMessage} className="bg-[#be266a] text-white px-4 py-2 rounded hover:bg-[#9c1e56]">
          Send
        </button>
        <button onClick={handleReset} className="bg-red-700 px-4 py-2 rounded hover:bg-red-500">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Chat;

{
  /**
   *   return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>{msg.content}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
        <button type="submit">Send</button>
        <button onClick={handleReset} className="reset-button">Reset Conversation</button>
      </form>
    </div>
  );
   */

   {/*onKeyDown={e => e.key === 'Enter' && sendMessage()}*/} 
}