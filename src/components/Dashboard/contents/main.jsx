import React, { Component, useEffect, useState } from "react";
import { Redirect, Switch, Route, NavLink } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { IoIosImages } from "react-icons/io";
import { AiOutlineComment, AiOutlineHome } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import "../../../styles/dashboardCss/mainContent.css";

const Main = ({ allData }) => {
  const [rates, setrates] = useState(null);

  useEffect(() => {});

  return (
    <React.Fragment>
      <p style={{ color: "gray" }}>
        <AiOutlineHome /> Dashboard
      </p>
      {allData && allData[0] && allData[1] && allData[2] && allData[3] ? (
        <div className="main-dashboard-container">
          <NavLink to="/dashboard/users">
            <div className="single-main-statiscs">
              <div>
                <FiUsers fontSize={60} color="deepskyblue" />
              </div>
              <div>
                <h6>Users...</h6>
                <p>{allData[0].length}</p>
              </div>
            </div>
          </NavLink>
          <NavLink to="/dashboard/posts">
            <div className="single-main-statiscs">
              {" "}
              <div>
                <IoIosImages fontSize={60} color="lightgreen" />
              </div>
              <div>
                {" "}
                <h6>Posts...</h6>
                <p>{allData[1].length}</p>
              </div>
            </div>
          </NavLink>
          <NavLink to="/dashboard/comments">
            <div className="single-main-statiscs">
              {" "}
              <div>
                <AiOutlineComment fontSize={60} color="orange" />
              </div>
              <div>
                {" "}
                <h6>Comments...</h6>
                <p>{allData[2].length}</p>
              </div>
            </div>
          </NavLink>
          <NavLink to="/dashboard/rates">
            <div className="single-main-statiscs">
              {" "}
              <div>
                {" "}
                <FaRegStar fontSize={60} color="yellow" />
              </div>
              <div>
                {" "}
                <h6>Rates...</h6>
                <p>{allData[3].length}</p>
              </div>
            </div>
          </NavLink>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Main;
