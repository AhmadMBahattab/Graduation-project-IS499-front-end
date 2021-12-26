import React, { useState } from "react";
import "../../styles/searchBox.css";
import { BiSearchAlt2 } from "react-icons/bi";

const SerchBox = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <div className="search-icon">
        <BiSearchAlt2 />
      </div>

      <input
        type="text"
        name="query"
        className="form-control"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SerchBox;
