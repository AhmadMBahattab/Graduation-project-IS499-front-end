import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";
import "../../../styles/editProfile.css";

const EditProfile = ({ user, closeEditProfile, updateUserOfBackend }) => {
  const [userId, setuserId] = useState(user._id);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [image, setimage] = useState(user.image);

  const [hideUserName, sethideUserName] = useState(user.roles.hideUserName);
  const [hideFullName, sethideFullName] = useState(user.roles.hideFullName);
  const [hidePhoneNumber, sethidePhoneNumber] = useState(
    user.roles.hidePhoneNumber
  );
  const [hidePersonalImage, sethidePersonalImage] = useState(
    user.roles.hidePersonalImage
  );

  const enabeleFeature = (user, featcher) => {
    // let user = { ...user };
    // console.log(user);
  };
  const disableFeature = () => {
    console.log("Enable");
  };
  const onChangeFile = (e) => {
    let image = null;
    if (e.target.name === "image") {
      image = e.target.files[0].name;
      console.log(image);
    }
    setimage(image);
  };

  return (
    <div className="edit-profile-page-container">
      <Link to="/profile">
        <button onClick={closeEditProfile} className="edit-edit-profile-button">
          <BiArrowBack />
        </button>
      </Link>
      {user ? (
        <div className="edit-profile-image-container">
          <div className="edit-profile-image">
            <img
              src={require(`../../../Photos/${image}`).default}
              alt="Personal image"
            />
            <br />
            <input
              hidden={true}
              className="custom-file-input"
              id="file"
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                console.log(e.target.files[0].name);
                setimage(e.target.files[0].name);
              }}
            />
            <label for="file">Change image</label>
          </div>
        </div>
      ) : null}
      <hr />
      <div className="edit-section-title">
        <FaUserAlt style={{ fontSize: 30 }} />
        <h3>About</h3>
      </div>

      {user ? (
        <div className="edit-profile-user-info-container">
          <div className="edit-profile-username">Username:</div>
          <div>{user.userName}</div>
          <div className="edit-profile-email">Email:</div>

          <div>{user.email}</div>
          <div className="edit-profile-firstname">FirstName:</div>
          <div className="edit-profile-input">
            <input
              maxLength={15}
              className="form-control"
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div className="edit-profile-lastname">Last name:</div>
          <div className="edit-profile-input">
            <input
              maxLength={15}
              className="form-control"
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div className="edit-profile-phonenumber">Phone number:</div>
          <div className="edit-profile-input">
            <input
              max={10}
              className="form-control"
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
        </div>
      ) : null}

      <div className="edit-user-roles-container">
        <hr />
        <div className="edit-section-title">
          <MdNotificationsActive style={{ fontSize: 30 }} />
          <h3>Properties</h3>
        </div>

        <div className="roles">
          <div>Hide my username:</div>
          {hideUserName ? (
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked
                  disabled={false}
                  onClick={(e) => {
                    sethideUserName(false);
                    console.log("UserName" + hideUserName);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          ) : (
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  disabled={false}
                  onClick={(e) => {
                    sethideUserName(true);
                    console.log("UserName" + hideUserName);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          )}

          <div>Hide my full name:</div>
          {hideFullName ? (
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked
                  disabled={false}
                  onClick={(e) => {
                    sethideFullName(false);
                    console.log("FullName" + hideFullName);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          ) : (
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  disabled={false}
                  onClick={(e) => {
                    sethideFullName(true);
                    console.log("FullName" + hideFullName);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          )}
          <div>Hide my user image:</div>
          {hidePersonalImage ? (
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked
                  disabled={false}
                  onClick={(e) => {
                    sethidePersonalImage(false);
                    console.log("Personal image" + hidePersonalImage);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          ) : (
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  disabled={false}
                  onClick={(e) => {
                    sethidePersonalImage(true);
                    console.log("Personal image" + hidePersonalImage);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="buttons-container">
        <hr />
        <button
          className="btn btn-primary"
          onClick={() =>
            updateUserOfBackend(
              user,
              image,
              firstName,
              lastName,
              phoneNumber,
              hideUserName,
              hideFullName,
              hidePhoneNumber,
              hidePersonalImage
            )
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
