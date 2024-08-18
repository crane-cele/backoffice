import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/messages">Manage Messages</Link>
        </li>
        <li>
          <Link to="/segments">Manage User Segments</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;