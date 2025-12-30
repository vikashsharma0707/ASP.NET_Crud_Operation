import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/Edit.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeNumber: '',
    name: '',
    city: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/viewemployee/${id}`);
        setFormData(res.data);
      } catch (err) {
        alert('Error');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.employeeNumber) tempErrors.employeeNumber = 'Required';
    if (!formData.name) tempErrors.name = 'Required';
    if (!formData.city) tempErrors.city = 'Required';
    if (!formData.salary || isNaN(formData.salary)) tempErrors.salary = 'Valid number required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await api.put('/updateemployee', formData);
        alert('Employee updated!');
        navigate('/list');
      } catch (err) {
        alert('Error');
      }
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="employeeNumber" placeholder="Employee Number" value={formData.employeeNumber} onChange={handleChange} />
        {errors.employeeNumber && <span className="error">{errors.employeeNumber}</span>}
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        {errors.city && <span className="error">{errors.city}</span>}
        <input name="salary" type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} />
        {errors.salary && <span className="error">{errors.salary}</span>}
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default Edit;