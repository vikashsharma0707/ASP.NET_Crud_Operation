// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import { Link } from 'react-router-dom';
// import '../css/List.css';

// const List = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const res = await api.get('/getemployees');
//       setEmployees(res.data);
//       setLoading(false);
//     } catch (err) {
//       alert('Cannot load employees. Check if backend is running.');
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Delete this employee?')) {
//       try {
//         await api.delete(`/deleteemployee/${id}`);
//         fetchEmployees();
//       } catch (err) {
//         alert('Delete failed');
//       }
//     }
//   };

//   if (loading) return <div>Loading employees...</div>;

//   return (
//     <div className="list-container">
//       <h2>All Employees</h2>
//       {employees.length === 0 ? (
//         <p>No employees found. Add some!</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Number</th>
//               <th>Name</th>
//               <th>City</th>
//               <th>Salary</th>
//               <th>Avatar</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map(emp => (
//               <tr key={emp.employeeId}>
//                 <td>{emp.employeeId}</td>
//                 <td>{emp.employeeNumber}</td>
//                 <td>{emp.name}</td>
//                 <td>{emp.city}</td>
//                 <td>{emp.salary}</td>
//                 <td><img src={emp.avatarImage} alt="avatar" className="avatar" /></td>
//                 <td>
//                   <Link to={`/view/${emp.employeeId}`}>View</Link> | 
//                   <Link to={`/edit/${emp.employeeId}`}>Edit</Link> | 
//                   <button onClick={() => handleDelete(emp.employeeId)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default List;



import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../css/List.css';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/getemployees');
      setEmployees(res.data);
    } catch (err) {
      alert('Cannot load employees. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this employee?')) {
      try {
        await api.delete(`/deleteemployee/${id}`);
        fetchEmployees();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <div className="loading">Loading employees...</div>;

  return (
    <div className="list-container">
      <h2>All Employees</h2>

      {employees.length === 0 ? (
        <p className="empty">No employees found. Add some!</p>
      ) : (
        <table className="employee-table">
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
            {employees.map(emp => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.employeeNumber}</td>
                <td>{emp.name}</td>
                <td>{emp.city}</td>
                <td>₹ {emp.salary}</td>
                <td>
                  <img
                    src={emp.avatarImage}
                    alt="avatar"
                    className="avatar"
                  />
                </td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/view/${emp.employeeId}`}
                      className="btn view-btn"
                    >
                      View
                    </Link>

                    <Link
                      to={`/edit/${emp.employeeId}`}
                      className="btn edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(emp.employeeId)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default List;
