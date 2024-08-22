import React from 'react';
import './AdminGraph.css'; // Import the CSS file

const AdminGraph = ({ totalUsers, totalLoginCount }) => {
  return (
    // <div className='container'>
      <dl className="flex-grid-container">
        <div className="card">
          <dt>Total Users</dt>
          <dd>{totalUsers}</dd>
        </div>
        <div className="card">
          <dt>Total Clicks</dt>
          <dd>{totalLoginCount}</dd>
        </div>
      </dl>
    // </div>
  );
}

export default AdminGraph;
