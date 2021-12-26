import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import { BadgedButton } from "@react-md/badge";
import "../../../styles/upComingResNav.css";

const UpComingReservationsNavBar = ({
  user,
  allResRequests,
  requestsNumber,
  acceptedRequests,
  canceledRequests,
  active,
}) => {
  // let filterdRequests = allResRequests.filter((resReq) => {
  //   return resReq.ownerId === user._id;
  // });
  const [clicked, setClicked] = useState(false);
  const onClickNavBar = (e) => {
    console.log(e.target.classList.toggle("active"));
  };

  return (
    <div className="reservations-navbar-container">
      {user ? (
        <div className="reservations-Navbar-links" onClick={onClickNavBar}>
          <div className={`nextRes ${active == "nextRes" && "active"}`}>
            <NavLink to={"/myChalets/upcomingReservations/" + user._id}>
              <h5>My next reservation</h5>
            </NavLink>
          </div>
          <div className={`acceptRes ${active == "acceptRes" && "active"}`}>
            <NavLink
              to={"/myChalets/myChaletsReservations/" + user._id}
              className={"notification "}
            >
              <h5>Accepted reservations</h5>
              <span className="badge" style={{ backgroundColor: "lightgreen" }}>
                {acceptedRequests}
              </span>
            </NavLink>
          </div>
          <div className={`cancelRes ${active == "cancelRes" && "active"}`}>
            <NavLink
              to={"/myChalets/canceledRequests/" + user._id}
              className={"notification "}
            >
              <h5>Canceled requests</h5>
              <span className="badge" style={{ backgroundColor: "red" }}>
                {canceledRequests}
              </span>
            </NavLink>
          </div>
          <div
            className={`requests-reservations-container ${
              active == "requests" && "active"
            }`}
          >
            <NavLink
              to={"/myChalets/reservationsRequests/" + user._id}
              className={"notification "}
            >
              <h5>Reservation requests</h5>
              <span className="badge" style={{ backgroundColor: "orange" }}>
                {requestsNumber}
              </span>
            </NavLink>
          </div>
        </div>
      ) : null}
      <hr />
    </div>
  );
};

export default UpComingReservationsNavBar;
