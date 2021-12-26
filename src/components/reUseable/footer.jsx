import React, { Component } from "react";
import { Route, Redirect, Switch, NavLink } from "react-router-dom";
import { AiFillTwitterCircle, AiFillGoogleCircle } from "react-icons/ai";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import "../../styles/infoFooter.css";

class InfoFooter extends Component {
  render() {
    return (
      <div className="footer">
        <div className="row">
          {/* column1 */}
          <div className="col">
            <h4>Students names</h4>
            <ul className="list-unstyled">
              <li>Ahmad Bahattab</li>
              <li>Naif Alnasser</li>
            </ul>
          </div>
          {/* colmn2 */}
          <div className="col">
            <h4>Project information</h4>
            <ul
              className="list-unstyled"
              style={{ color: "white", textDecoration: "none" }}
            >
              <NavLink to="/projectInfo">
                <li>About</li>
              </NavLink>
            </ul>
          </div>
          <div className="col">
            <h4>More information</h4>
            <ul
              className="list-unstyled"
              style={{ color: "white", textDecoration: "none" }}
            >
              <NavLink to="/contact">
                <li>Contact us</li>
              </NavLink>
            </ul>
          </div>
          {/* coulmn3 */}
          <div className="col">
            <h4>supervised by</h4>
            <ul className="list-unstyled">
              <li>D. Omar Alrwais</li>
            </ul>
          </div>
        </div>

        <div className="apps-container">
          <ul>
            <li>
              <AiFillTwitterCircle />
            </li>
            <li>
              <FaFacebook />
            </li>
            <li>
              <TiSocialYoutubeCircular />
            </li>
            <li>
              <AiFillGoogleCircle />
            </li>
            <li>
              <FaInstagramSquare />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default InfoFooter;
