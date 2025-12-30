import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../css/Search.css';

const Search = () => {
  const [searchData, setSearchData] = useState({
    name: '',
    city: '',
    employeeNumber: ''
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/searchemployee', searchData);
      setResults(res.data);
    } catch (err) {
      alert('No results or Login required');
    }
  };

  return (
    <div className="search-container">
      <h2>Search Employee</h2>
      <form onSubmit={handleSearch}>
        <input name="name" placeholder="Name" value={searchData.name} onChange={handleChange} />
        <input name="city" placeholder="City" value={searchData.city} onChange={handleChange} />
        <input name="employeeNumber" placeholder="Employee Number" value={searchData.employeeNumber} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {results.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Number</th>
              <th>Name</th>
              <th>City</th>
              <th>Salary</th>
              <th>Avatar</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map(emp => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.employeeNumber}</td>
                <td>{emp.name}</td>
                <td>{emp.city}</td>
                <td>{emp.salary}</td>
                <td><img src={emp.avatarImage} alt="avatar" className="avatar" /></td>
                <td>
                  <Link to={`/view/${emp.employeeId}`}>View</Link> | 
                  <Link to={`/edit/${emp.employeeId}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Search;