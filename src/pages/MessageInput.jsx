import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSendClick = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendClick}>
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default MessageInput;
