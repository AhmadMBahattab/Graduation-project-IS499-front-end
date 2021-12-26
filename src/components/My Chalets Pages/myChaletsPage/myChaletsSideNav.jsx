import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SideNav extends Component {
  state = {};
  onChangeNavBar = (e) => {
    // e.target.classList.toggle("active");
    console.log("click");
  };
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {user ? (
          <div className="myChalets-sidenav ">
            <div onClick={this.onChangeNavBar}>
              <NavLink to={"/myChalets/myChaletsPage/" + user._id}>
                My chalets
              </NavLink>
            </div>
            <div onClick={this.onChangeNavBar} className="upcoming">
              <NavLink to={"/myChalets/upcomingReservations/" + user._id}>
                Upcoming reservations
              </NavLink>
            </div>
            <div onClick={this.onChangeNavBar} className="old">
              <NavLink to={"/myChalets/oldReservations/" + user._id}>
                My old reservations
              </NavLink>
            </div>
            <div onClick={this.onChangeNavBar} className="old">
              <NavLink to={"/myChalets/myclientsoldreserves/" + user._id}>
                My clients old reservations
              </NavLink>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default SideNav;
