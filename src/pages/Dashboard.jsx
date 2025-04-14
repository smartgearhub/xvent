import React from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Topbar />
      <div className="dashboard-body">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Feed */}
        <div className="dashboard-feed">
          <Feed />
        </div>

        {/* Right Section */}
        <div className="dashboard-right">
          <div className="coming-soon-box">
            <h3>Coming Soon 🚀</h3>
            <p>Role-based tools and insights will appear here soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
