import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import  { Captured } from './components/Captured.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Captured />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);


