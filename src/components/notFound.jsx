import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/notfound.css";

const NotFound = () => {
  return (
    <div className="not-fond-container">
      <h1 className="not-found-status">404</h1>
      <div className="not-fonund-info">
        <h1>Page not found</h1>
        <p>Please check the URL in address bar and try again</p>
      </div>
      <p></p>
      <div className="notfound-button-container">
        <NavLink to="/home">
          <button className="btn btn-primary">Go back to home</button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
