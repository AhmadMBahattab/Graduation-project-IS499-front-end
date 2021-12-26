import React, { Component, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const DeleteUserForm = ({
  users,
  deleteWholeUser,
  deleteSomeUserProperties,
  openAndCloseDeleteConfirm,
}) => {
  const { id } = useParams();
  let user = users.filter((e) => e._id === id);
  user = user[0];

  const [deleteSome, setdeleteSome] = useState([]);

  const handeleDeleteSomeCheckbox = ({ currentTarget: input }) => {
    let index = deleteSome.indexOf(input.value);
    if (index === -1) {
      deleteSome.push(input.value);
      deleteSome.sort();
    }
    if (index !== -1) {
      deleteSome.splice(index, 1);
    }

    console.log(deleteSome);
    setdeleteSome(deleteSome);
  };
  return (
    <div className="delete-user-container">
      <NavLink to="/dashboard/users">
        {" "}
        <button className="back-button" onClick={openAndCloseDeleteConfirm}>
          X
        </button>
      </NavLink>

      <div className="user-information-delete-container">
        <div className="delete-user-image">
          <img
            src={require(`../../../../Photos/${user.image}`).default}
            alt="User image"
          />
        </div>
        <br />
        <div className="delete-user-information">
          <p>{user.userName}</p>
          <p>{user.email}</p>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.phoneNumber}</p>
          <p>Not admin</p>
        </div>
      </div>
      <hr />
      <div className="delete-user-checkbox">
        <div className="delete-few">
          <div className="checkbox-container">
            {``}

            <label className="single-checkbox-container" htmlFor="posts">
              All Posts{" "}
              <input
                type="checkbox"
                id="posts"
                name="everything"
                value="Posts"
                onChange={handeleDeleteSomeCheckbox}
              />
              <span className="checkmark"></span>
            </label>

            <label className="single-checkbox-container" htmlFor="comments">
              All comments
              <input
                type="checkbox"
                id="comments"
                name="everything"
                value="Comments"
                onChange={handeleDeleteSomeCheckbox}
              />
              <span className="checkmark"></span>
            </label>

            <label className="single-checkbox-container" htmlFor="reservations">
              All reservations
              <input
                type="checkbox"
                id="reservations"
                name="everything"
                value="Reservations"
                onChange={handeleDeleteSomeCheckbox}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <hr />
      <br />

      <div className="delete-user-buttons">
        <button
          className=" btn btn-danger"
          style={{ marginRight: 30 }}
          onClick={() => deleteWholeUser(user)}
        >
          Delete whole account
        </button>
        <button
          className=" btn btn-danger"
          onClick={() => deleteSomeUserProperties(user, deleteSome)}
        >
          Delete some{" "}
        </button>
      </div>
    </div>
  );
};

export default DeleteUserForm;
