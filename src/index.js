import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { InvoiceContextProvider } from './store/Invoice-context';

ReactDOM.render(
  <InvoiceContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </InvoiceContextProvider>,
  document.getElementById('root')
);

