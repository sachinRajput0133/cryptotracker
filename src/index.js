import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import CryptoContext from './CryptoContext';
import ContextTest from './ContextTest';
import 'react-alice-carousel/lib/alice-carousel.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextTest>

  <React.StrictMode>

    <App />

  </React.StrictMode>


  </ContextTest>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

