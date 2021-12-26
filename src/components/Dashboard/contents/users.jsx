import React, { Component, useState } from "react";
import DeleteUserForm from "./usersControlForm/deleteUser";
import EditUserForm from "./usersControlForm/editUser";
import Pagination from "../../../components/reUseable/pagination";
import { paginate } from "../../../utils/paginate";
import http from "../../../Services/httpService";
import { AiOutlineSearch, AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import "../../../styles/dashboardCss/usersContent.css";
import { NavLink, Route } from "react-router-dom";
import { toast } from "react-toastify";

const dashboardUsersEndPoint = "http://localhost:5000/dashboard/users";

const UsersDashboard = ({
  allData,
  searchQuery,
  handelSearch,
  currentPage,
  handelPageChange,
}) => {
  const [pageSize, setpageSize] = useState(12);
  const [openDeleteConfirm, setopenDeleteConfirm] = useState(false);
  const [openEditUser, setopenEditUser] = useState(false);

  const calculatePosts = (userId) => {
    let totalPosts = 0;
    for (let post of allData[1]) {
      if (post.userId == userId) {
        totalPosts++;
      }
    }
    return totalPosts;
  };
  const calculateComments = (userId) => {
    let totalComments = 0;
    for (let comment of allData[2]) {
      if (comment.userId == userId) {
        totalComments++;
      }
    }
    return totalComments;
  };
  ("");
  const calculateRates = (userId) => {
    let totalRates = 0;
    for (let rate of allData[3]) {
      if (rate.userId == userId) {
        totalRates++;
      }
    }
    return totalRates;
  };

  const deleteWholeUser = async (user) => {
    const { data: deleteUser } = await http.delete(
      dashboardUsersEndPoint + "/" + user._id
    );
    window.location.reload();
  };
  const deleteSomeUserProperties = async (user, arrayOfProperties) => {
    if (arrayOfProperties.length == 0)
      return toast.warning("You did't choose any property to remove");

    let userAndProperties = {
      userId: user._id,
      properties: arrayOfProperties,
    };
    const { data: deleteUser } = await http.put(
      dashboardUsersEndPoint + "/" + user._id,
      userAndProperties
    );
    window.location.reload();
  };
  const editUserProfile = async (
    user,
    firstName,
    lastName,
    phoneNumber,
    isAdmin
  ) => {
    let userEdited = {
      userId: user._id,
      firstName,
      lastName,
      phoneNumber,
      isAdmin,
    };
    const { data: editUser } = await http.put(
      dashboardUsersEndPoint + "/" + user._id,
      userEdited
    );
    if (editUser == "Values not allowed") {
      return toast.error("You entered not allowed values");
    }
    window.location.reload();
  };

  const openAndCloseDeleteConfirm = () => {
    setopenDeleteConfirm(!openDeleteConfirm);
  };
  const openAndCloseUserEditForm = () => {
    setopenEditUser(!openEditUser);
  };

  let filterUsers = allData[0].filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const usersArray = paginate(filterUsers, currentPage, pageSize);
  console.log(allData[0]);
  return (
    <React.Fragment>
      {allData && usersArray && filterUsers ? (
        <div className="dashboard-users-container">
          <p style={{ color: "gray" }}>
            <FiUsers /> Users
          </p>
          <div className="search-users">
            <div className="search-users-icon">
              <AiOutlineSearch />
            </div>
            <div className="">
              <input
                className="form-control input-position"
                placeholder="Search by username..."
                value={searchQuery}
                onChange={(e) => handelSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="barinfo-container">
            <div>Users information</div>
            <div>Stats</div>
            <div>Edit buttons</div>
          </div>
          {openDeleteConfirm ? (
            <Route path={`/dashboard/users/:id`}>
              <div className="overlay">
                <DeleteUserForm
                  users={allData[0]}
                  openAndCloseDeleteConfirm={openAndCloseDeleteConfirm}
                  deleteWholeUser={deleteWholeUser}
                  deleteSomeUserProperties={deleteSomeUserProperties}
                />
              </div>
            </Route>
          ) : null}
          {openEditUser ? (
            <Route path={`/dashboard/users/:id`}>
              <div className="overlay">
                <EditUserForm
                  users={allData[0]}
                  openAndCloseUserEditForm={openAndCloseUserEditForm}
                  editUserProfile={editUserProfile}
                />
              </div>
            </Route>
          ) : null}
          {usersArray.length == 0 && <p>{<br></br>}No username match...</p>}
          {usersArray.map((user) => (
            <div key={user._id} className="single-user-container">
              <div className="user-info-container">
                <div className="user-image">
                  <img
                    src={require(`../../../Photos/${user.image}`).default}
                    alt="User profile image"
                  />
                </div>
                <div className="user-info">
                  <div>
                    <p>@{user.userName}</p>
                    <p>{user.email}</p>
                    <p>{user.phoneNumber}</p>
                  </div>
                  <div>
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    {user.isAdmin ? <p>Admin</p> : <p>Not admin</p>}
                  </div>
                </div>
              </div>
              <div className="user-states-container">
                <h5>Posts : </h5>
                <p>{calculatePosts(user._id)}</p>
                <h5>Comments : </h5>
                <p>{calculateComments(user._id)}</p>
                <h5>Rates :</h5>
                <p>{calculateRates(user._id)}</p>
              </div>
              <div className="user-buttons-container">
                {user.isAdmin ? (
                  <div>
                    <button className="edit-and-delete">
                      <AiFillEdit color="gray" />
                    </button>
                    <button className="edit-and-delete">
                      <MdDelete color="gray" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <NavLink to={`/dashboard/users/${user._id}`}>
                      <button
                        className="allow-edit-delete"
                        onClick={openAndCloseUserEditForm}
                      >
                        <AiFillEdit color="deepskyblue" />
                      </button>
                    </NavLink>
                    <NavLink to={`/dashboard/users/${user._id}`}>
                      <button
                        className="allow-edit-delete"
                        onClick={openAndCloseDeleteConfirm}
                      >
                        <MdDelete color="red" />
                      </button>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          ))}
          <Pagination
            itemsCount={filterUsers.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handelPageChange}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default UsersDashboard;
