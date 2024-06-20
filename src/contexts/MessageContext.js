import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [messageConfirmed, setMessageConfirmed] = useState(null);
  const [resolveConfirmation, setResolveConfirmation] = useState(null);

  const addMessage = (type, header, message) => {
    setMessages([...messages, { type, header, message }]);
  };

  const removeMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  const confirmMessage = () => {
    return new Promise((resolve) => {
      setResolveConfirmation(() => resolve);
    });
  };

  const handleConfirm = (value) => {
    if (resolveConfirmation) {
      resolveConfirmation(value);
      setResolveConfirmation(null);
    }
    setMessageConfirmed(value);
  };

  return (
    <MessageContext.Provider value={{
      messages,
      addMessage,
      removeMessage,
      confirmMessage,
      handleConfirm
    }}>
      {children}
    </MessageContext.Provider>
  );
};
