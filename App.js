import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './Firstpage';
import Registrationform from './Registrationform';
import ThankYouPage from './ThankYouPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/register" element={<Registrationform  />} />
        <Route path="/thank-you" element={<ThankYouPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
