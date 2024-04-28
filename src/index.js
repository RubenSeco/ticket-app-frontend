import React from 'react';
import ReactDOM from 'react-dom/client';
 
import { BrowserRouter } from 'react-router-dom';
 
import 'antd/dist/reset.css';
 
import { TicketApp } from './TicketApp';
 
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <TicketApp />
    </BrowserRouter>
);