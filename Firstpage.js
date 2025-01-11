import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Firstpage = () => {
  return (
    <div className="page-one">
      <h1>Welcome to the Registration Portal</h1>
      <Link to="/register">
      <button type="button" aria-label="Go to Registration">Go to Registration</button>

      </Link>
    </div>
  );
};

export default Firstpage;
