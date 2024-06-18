import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (type, header, message) => {
    setMessages([...messages, {type, header, message }]);
  };

  const removeMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
