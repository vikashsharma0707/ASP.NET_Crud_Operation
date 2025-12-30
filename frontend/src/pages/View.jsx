import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import '../css/View.css';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/viewemployee/${id}`);
        setEmployee(res.data);
      } catch (err) {
        alert('Error or Login required');
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="view-container">
      <h2>Employee Details</h2>
      <img src={employee.avatarImage} alt="avatar" className="big-avatar" />
      <p><strong>ID:</strong> {employee.employeeId}</p>
      <p><strong>Employee Number:</strong> {employee.employeeNumber}</p>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>City:</strong> {employee.city}</p>
      <p><strong>Salary:</strong> {employee.salary}</p>
      <Link to="/list">Back to List</Link>
    </div>
  );
};

export default View;