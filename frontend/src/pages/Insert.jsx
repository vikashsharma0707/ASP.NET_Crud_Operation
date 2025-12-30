import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../css/Insert.css';

const Insert = () => {
  const [formData, setFormData] = useState({
    employeeNumber: '',
    name: '',
    city: '',
    salary: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/insertemployee', formData);
      alert('Employee added successfully!');
      navigate('/list');
    } catch (err) {
      alert('Error adding employee');
    }
  };

  return (
    <div className="insert-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="employeeNumber" placeholder="Employee Number" value={formData.employeeNumber} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input name="salary" type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default Insert;