import React, { Component, useState } from "react";
import Pagination from "../../../components/reUseable/pagination";
import { paginate } from "../../../utils/paginate";
import { AiOutlineComment, AiOutlineSearch } from "react-icons/ai";
import "../../../styles/dashboardCss/commentsContent.css";
import { react } from "@babel/types";
import { MdDelete } from "react-icons/md";

const CommentsDashboard = ({
  allData,
  searchQuery,
  handelSearch,
  currentPage,
  handelPageChange,
  deleteComment,
}) => {
  let usersArr = allData[0];
  let postsArr = allData[1];
  let commentsArr = allData[2];
  let found;

  const [pageSize, setpageSize] = useState(20);

  let filterComments = commentsArr.filter((comment) =>
    comment.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const commentsArray = paginate(filterComments, currentPage, pageSize);

  // let filterUsers = usersArr.filter((user) =>
  //   user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  // const usersArray = paginate(filterUsers, currentPage, pageSize);
  return (
    <React.Fragment>
      <p style={{ color: "gray" }}>
        <AiOutlineComment /> Comments
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
      <br />

      <div className="dashboard-comments-container">
        <div className="barinfo-container" style={{ textAlign: "center" }}>
          <div>Users information</div>
          <div>Comment</div>
        </div>
        {commentsArray.length == 0 && <p>{<br></br>}No comment match...</p>}
        {commentsArray.map((comment) => (
          <div key={comment._id} className="dashboard-single-comment">
            {usersArr.map((user) => (
              <React.Fragment>
                {comment.userId == user._id ? (
                  <div className="dashboard-userinfo-section">
                    <div className="profile-image">
                      <img
                        src={require(`../../../Photos/${user.image}`).default}
                        alt="User profile image"
                      />
                    </div>
                    <div className="profile-info">
                      <p>@{user.userName}</p>
                      <p>{user.firstName + " " + user.lastName}</p>
                    </div>
                    <div className="dashboard-comment-section">
                      {comment.comment}
                      <button>
                        <MdDelete
                          size={30}
                          color="red"
                          onClick={() => deleteComment(comment)}
                        />
                      </button>
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        ))}
        <Pagination
          itemsCount={filterComments.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handelPageChange}
        />
      </div>
    </React.Fragment>
  );
};

export default CommentsDashboard;
