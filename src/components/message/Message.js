import React from 'react';
import { useMessage } from '../../contexts/MessageContext';
import './Message.css';

const Message = () => {
  const {
    messages,
    removeMessage,
    handleConfirm
  } = useMessage();

  const handleAccept = (index) => {
    console.log(`Aceptar mensaje ${index}`);
    removeMessage(index);
  };

  const handleCancel = (index) => {
    console.log(`Cancelar mensaje ${index}`);
    removeMessage(index);
  };

  const handleConfirmClick = (index, value) => {
    handleConfirm(value);
    removeMessage(index);
  }

  return (
    <>
      <div className="message-overlay" style={{ display: messages.length > 0 ? 'block' : 'none' }}></div>
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.type}`} style={{ display: messages.length > 0 ? 'block' : 'none' }}>
          {
            msg.type === 'success'
            || msg.type === 'warning'
            || msg.type === 'error'
              ? (
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
                      {msg.type === 'success' || msg.type === 'warning' ? (
                        <button className="accept-button" onClick={() => handleAccept(index)}>Aceptar</button>
                      ) : (
                        <button className="cancel-button" onClick={() => handleCancel(index)}>Cancelar</button>
                      )}
                    </div>
                  </div>
                </>
              ) : msg.type === 'confirm' ? (
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
                    <button className="accept-button" onClick={() => handleConfirmClick(index, true)}>SI</button>
                    <button className="cancel-button" onClick={() => handleConfirmClick(index, false)}>NO</button>
                  </div>
                </div>
              ) : null}
        </div>
      ))}
    </>
  );
};

export default Message;
