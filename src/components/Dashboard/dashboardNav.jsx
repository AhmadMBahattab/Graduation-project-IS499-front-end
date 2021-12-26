import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const DashboardNavBar = ({ massgesNumber }) => {
  return (
    <div className="dashboard-nav-container">
      <div className="single-link">
        <NavLink to="/dashboard/main">Dashboard</NavLink>
      </div>
      <div className="single-link">
        <NavLink to="/dashboard/users">Users</NavLink>
      </div>
      <div className="single-link">
        <NavLink to="/dashboard/posts">Posts</NavLink>
      </div>
      <div className="single-link">
        <NavLink to="/dashboard/comments">Comments</NavLink>
      </div>
      <div className="single-link">
        <NavLink to="/dashboard/rates">Rates</NavLink>
      </div>
      <div className="single-link">
        <NavLink to="/dashboard/messages" className="messages-notifications">
          <h5>Messages</h5>
          <span className="messages-badge">{massgesNumber}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardNavBar;
