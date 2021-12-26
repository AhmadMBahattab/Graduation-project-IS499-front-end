import React, { Component, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const EditUserForm = ({ users, editUserProfile, openAndCloseUserEditForm }) => {
  const { id } = useParams();
  let user = users.filter((e) => e._id === id);
  user = user[0];
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [phoneNumber, setphoneNumber] = useState(user.phoneNumber);
  const [isAdmin, setisAdmin] = useState([]);

  const handleAdminChange = ({ currentTarget: input }) => {
    let index = isAdmin.indexOf(input.value);
    if (index === -1) {
      isAdmin.push(input.value);
      isAdmin.sort();
    }
    if (index !== -1) {
      isAdmin.splice(index, 1);
    }

    console.log(isAdmin);
    setisAdmin(isAdmin);
  };

  return (
    <React.Fragment>
      <div className="edit-user-container">
        {" "}
        <NavLink to="/dashboard/users">
          <button className="back-button" onClick={openAndCloseUserEditForm}>
            X
          </button>
        </NavLink>
        <div className="user-information-edit-container">
          <div className="edit-user-image">
            <img
              src={require(`../../../../Photos/${user.image}`).default}
              alt="User image"
            />
          </div>
          <br />
          <div className="edit-user-information">
            <p>@{user.userName}</p>
            <p>{user.email}</p>
            <div>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <input
                className="form-control"
                type="text"
                name="LASTName"
                value={lastName}
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <input
                className="form-control"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  setphoneNumber(e.target.value);
                }}
                required
              />
            </div>
            <div className="checkbox-container">
              {``}

              <label className="single-checkbox-container" htmlFor="admin">
                Admin{" "}
                <input
                  type="checkbox"
                  id="admin"
                  name="pitch"
                  value="admin"
                  onChange={handleAdminChange}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <br />
        <br />
        <hr />
        <div className="edit-user-buttons">
          <NavLink to="/dashboard/users">
            {" "}
            <button
              className="btn btn-primary"
              onClick={() =>
                editUserProfile(user, firstName, lastName, phoneNumber, isAdmin)
              }
            >
              Save
            </button>
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditUserForm;
