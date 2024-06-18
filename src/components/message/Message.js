// src/components/message/Message.js
import React from 'react';
import { useMessage } from '../../contexts/MessageContext';
import './Message.css';

const Message = () => {
  const { messages, removeMessage } = useMessage();

  const handleAccept = (index) => {
    console.log(`Aceptar mensaje ${index}`);
    removeMessage(index);
  };

  const handleCancel = (index) => {
    console.log(`Cancelar mensaje ${index}`);
    removeMessage(index);
  };

  return (
    <>
      <div className="message-overlay" style={{ display: messages.length > 0 ? 'block' : 'none' }}></div>
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.type}`} style={{ display: messages.length > 0 ? 'block' : 'none' }}>
            <>
              <div className="message-container">
                <div className="message-header">
                    <h3>
                      {msg.header}
                    </h3>
                </div>
                <div className="message-body">
                  <p>{msg.message}</p>
                </div>
                <div className="message-actions">
                  {msg.type === 'success' || msg.type === 'warning'  ? (
                    <button className="accept-button" onClick={() => handleAccept(index)}>Aceptar</button>
                  ) : (
                    <button className="cancel-button" onClick={() => handleCancel(index)}>Cancelar</button>
                  )}
                </div>
              </div>
            </>
        </div>
      ))}
    </>
  );
};

export default Message;
