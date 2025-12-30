import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Insert from './pages/Insert';
import List from './pages/List';
import View from './pages/View';
import Edit from './pages/Edit';
import Search from './pages/Search';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <Link to="/list">Employee List</Link>
          <Link to="/insert">Add Employee</Link>
          <Link to="/search">Search Employee</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/list" element={<List />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;