import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import SidNavBarProfile from "./profileComponent/sideNavBar";
import EditProfile from "./profileComponent/editProfile";
import http from "../../Services/httpService";
import auth from "../../Services/authService";
import { FiEdit } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import "../../styles/profile.css";
import { toast } from "react-toastify";

const EndPoint = "http://localhost:5000/profile";

class Profile extends React.Component {
  state = { boolean: false, showEditProfile: false, closeProfile: true };
  test = () => {
    let boolean = !this.state.boolean;
    console.log(boolean);
    this.setState({ boolean });
  };

  updateUserOfBackend = async (
    user,
    image,
    firstName,
    lastName,
    phoneNumber,
    hideUserName,
    hideFullName,
    hidePhoneNumber,
    hidePersonalImage
  ) => {
    let updateUser = {};

    updateUser = { ...user };
    updateUser.image = image;
    updateUser.firstName = firstName;
    updateUser.lastName = lastName;
    updateUser.phoneNumber = phoneNumber;
    updateUser.roles.hideUserName = hideUserName;
    updateUser.roles.hideFullName = hideFullName;
    updateUser.roles.hidePhoneNumber = hidePhoneNumber;
    updateUser.roles.hidePersonalImage = hidePersonalImage;

    console.log(updateUser.roles);
    if (
      updateUser.phoneNumber.length < 8 ||
      updateUser.phoneNumber.length > 10
    ) {
      return toast.error("Phone number must be valid ");
    }
    if (updateUser.firstName.length < 2 || updateUser.firstName.length > 15) {
      return toast.error("First name must be valid ");
    }
    if (updateUser.lastName.length < 2 || updateUser.lastName.length > 15) {
      return toast.error("Last name must be valid ");
    }
    let userNew = await http.put(EndPoint + "/" + user._id, updateUser);
    toast.success(`Update sucsses   
    logout to apply changes
    `);
    console.log(userNew);
    this.setState({ showEditProfile: false, closeProfile: true });
    // localStorage.removeItem("token");
    // localStorage.setItem("token", userNew.headers["x-auth-token"]);
    // window.location = "/";
  };

  openEditProfile = () => {
    this.setState({ showEditProfile: true, closeProfile: false });
  };
  closeEditProfile = () => {
    window.location = "/profile";
    this.setState({ showEditProfile: false, closeProfile: true });
  };
  render() {
    const { showEditProfile, closeProfile } = this.state;
    const { user } = this.props;

    return (
      <React.Fragment>
        {user ? (
          <Route path={"/profile/" + user._id}>
            {showEditProfile && (
              <EditProfile
                user={user}
                closeEditProfile={this.closeEditProfile}
                updateUserOfBackend={this.updateUserOfBackend}
              />
            )}
          </Route>
        ) : null}

        {closeProfile && (
          <div className="profile-page-container">
            {user ? (
              <Link to={"/profile/" + user._id}>
                <button
                  onClick={this.openEditProfile}
                  className="edit-profile-button"
                >
                  <FiEdit />
                </button>
              </Link>
            ) : null}
            {user ? (
              <div className="profile-image-container">
                <div className="profile-image-sitting">
                  <img
                    src={require(`../../Photos/${user.image}`).default}
                    alt="chalet"
                  />
                </div>
              </div>
            ) : null}
            <hr />
            <div className="section-title">
              <FaUserAlt style={{ fontSize: 30 }} />
              <h3>About</h3>
            </div>

            {user ? (
              <div className="profile-user-info-container">
                <div className="profile-username">Username:</div>
                <div>{user.userName}</div>

                <div className="profile-email">Email:</div>
                <div>{user.email}</div>

                <div className="profile-firstname">First name:</div>
                <div>{user.firstName}</div>

                <div className="profile-lastname">Last name:</div>
                <div>{user.lastName}</div>

                <div className="profile-phonenumber">Phone number:</div>
                <div>{user.phoneNumber}</div>
              </div>
            ) : null}
            {user ? (
              <div className="user-roles-container">
                <hr />
                <div className="section-title">
                  <MdNotificationsActive style={{ fontSize: 30 }} />
                  <h3>Properties</h3>
                </div>

                <div className="roles">
                  <div>Hide my username:</div>
                  {user.roles.hideUserName ? (
                    <div>
                      <label className="switch">
                        <input type="checkbox" checked disabled={true} />
                        <span className="slider round disableCursor"></span>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <label className="switch">
                        <input type="checkbox" disabled={true} />
                        <span className="slider round disableCursor"></span>
                      </label>
                    </div>
                  )}

                  <div>Hide my full name:</div>
                  {user.roles.hideFullName ? (
                    <div>
                      <label className="switch">
                        <input type="checkbox" checked disabled={true} />
                        <span className="slider round  disableCursor"></span>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <label className="switch">
                        <input type="checkbox" disabled={true} />
                        <span className="slider round  disableCursor"></span>
                      </label>
                    </div>
                  )}
                  <div>Hide my user image:</div>
                  {user.roles.hidePersonalImage ? (
                    <div>
                      <label className="switch">
                        <input type="checkbox" checked disabled={true} />
                        <span className="slider round  disableCursor"></span>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <label className="switch">
                        <input type="checkbox" disabled={true} />
                        <span className="slider round  disableCursor"></span>
                      </label>
                    </div>
                  )}
                  {/* <div>Hide my phone number:</div>
                  {user.roles.hidePhoneNumber ? (
                    <div>
                      <label className="switch">
                        <input type="checkbox" checked disabled={true} />
                        <span className="slider round disableCursor"></span>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <label className="switch">
                        <input type="checkbox" disabled={true} />
                        <span className="slider round  disableCursor"></span>
                      </label>
                    </div>
                  )} */}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Profile;
