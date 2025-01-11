import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Registrationform = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    classvalue: '',
    mobile: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

 

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5024/register', formData); // Ensure the correct port
      setMessage('Registration Successful!');
      setFormData({
        name: '',
        dob: '',
        gender: '',
        classvalue: '',
        mobile: '',
        email: ''
      });
      console.log('Registration Successful', response);
      
      // Clear the message and navigate after 3 seconds
      setTimeout(() => {
        setMessage('');
        navigate('/thank-you');
      }, 3000);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setMessage(error.response.data.error || 'There was an error during registration. Please try again.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setMessage('No response from server. Please try again later.');
      } else {
        console.error('Error message:', error.message);
        setMessage('There was an error. Please try again.');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      dob: '',
      gender: '',
      classvalue: '',
      mobile: '',
      email: ''
    });
    setMessage('');
  };

  return (
    <div className="form-container">
      
      {message && (
        <div className={`message-banner ${message.includes('error') ? 'error' : 'success'}`}>
          <p>{message}</p>
        </div>
      )}
      <h1>REGISTER HERE👇🏿</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name: <span className="mandatory">*</span></label>
        <input
          type="text"
          id="fullName"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />
        <label htmlFor="dob">Date of Birth: <span className="mandatory">*</span></label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        /><br />
        <label htmlFor="gender">Gender: <span className="mandatory">*</span></label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select><br />
        <label htmlFor="classvalue">Standard: <span className="mandatory">*</span></label>
        <select
          id="classvalue"
          name="classvalue"
          value={formData.classvalue}
          onChange={handleChange}
          required
        >
          <option value="">Select Standard</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select><br />
        <label htmlFor="mobile">Mobile Number: <span className="mandatory">*</span></label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          pattern="[0-9]{10}"
          title="Please enter a 10-digit mobile number"
          required
        /><br />
        <label htmlFor="email">Email: <span className="mandatory">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />
        <div className="button-wrapper">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Registrationform;
