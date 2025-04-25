import React, { useState } from 'react';
import './Form.css';
import logo from '../assets/aryng-logo.png';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function Form({ onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    industry: '',
    companySize: '',
    jobTitle: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/submit-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (response.ok) {
      onSuccess(formData.email);
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#019aa8] text-white flex flex-col justify-center items-center p-12">
        <img src={logo} alt="Aryng Logo" className="w-32 mb-6" />
        <h1 className="text-3xl font-bold text-center">Aryng AI Roadmap Assistant</h1>
        <p className="mt-4 text-center text-lg max-w-md">Let's help you build your AI roadmap — one step at a time.</p>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex flex-col justify-center p-12 bg-white">
        <h2 className="text-2xl font-semibold text-[#062D4E] mb-6">Get Started</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md" />
            <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          <input type="text" name="company" placeholder="Company Name" required onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          <input type="text" name="industry" placeholder="Industry" onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          <select name="companySize" required onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md">
            <option value="">Select Company Size</option>
            <option value="1-10">1–10</option>
            <option value="11-50">11–50</option>
            <option value="51-200">51–200</option>
            <option value="200+">200+</option>
          </select>
          <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md" />

          <button type="submit"
            className="w-full bg-[#be266a] text-white py-2 rounded-md hover:bg-[#9c1e56] transition">
            Start Chat
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
{/*
  <form className="form-container" onSubmit={handleSubmit}>
      
      {['firstName', 'lastName', 'email', 'companyName', 'industry', 'jobTitle'].map((field) => (
        <input key={field} name={field} placeholder={field} onChange={handleChange} required />
      ))}
      <select name="companySize" onChange={handleChange} required>
        <option value="">Company Size</option>
        <option value="1-10">1-10</option>
        <option value="11-50">11-50</option>
        <option value="51-200">51-200</option>
        <option value="200+">200+</option>
      </select>
      <button type="submit">Start Chat</button>
    </form>
 */}