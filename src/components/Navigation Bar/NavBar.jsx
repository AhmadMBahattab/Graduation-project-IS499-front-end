import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { BsHouseDoor } from "react-icons/bs";
import "../../styles/navbar.css";

const NavBar = ({ user, userLogin }) => {
  const notLoginMassege = () => {
    return toast.error("You must be a member");
  };
  return (
    <React.Fragment>
      <div className="nav-container">
        <header className="nav-logo">
          <div style={{ cursor: "context-menu", color: "white", fontSize: 40 }}>
            <p>
              <BsHouseDoor /> Estrahtk
            </p>
          </div>
          <nav>
            <ul className="nav__links">
              <li>
                <NavLink className="nav-titles" to="/home">
                  Home
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink className="nav-titles" to="/myChalets">
                    My Chalets
                  </NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink
                    onClick={notLoginMassege}
                    className="nav-titles"
                    to="/login"
                  >
                    My Chalets
                  </NavLink>
                </li>
              )}

              {user && user.isAdmin && (
                <li>
                  <NavLink className="nav-titles" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          {!user && (
            <div>
              <NavLink className="nav-titles" to="/login">
                Log in
              </NavLink>

              <span> |</span>
              <NavLink className="nav-titles" to="/register">
                Sign up
              </NavLink>
            </div>
          )}
          {user && (
            <div>
              <NavLink className="nav-titles" to="/profile">
                {user.userName}
              </NavLink>

              <span> |</span>
              <NavLink className="nav-titles" to="/logout">
                LogOut
              </NavLink>
            </div>
          )}
        </header>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
