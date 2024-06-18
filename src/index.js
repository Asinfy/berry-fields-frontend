import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MessageProvider } from './contexts/MessageContext';
import Message from './components/message/Message';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MessageProvider>
      <App />
      <Message />
    </MessageProvider>
  </React.StrictMode>
);