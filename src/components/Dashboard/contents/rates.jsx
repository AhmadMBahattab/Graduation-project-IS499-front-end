import React, { Component, useState } from "react";
import Pagination from "../../../components/reUseable/pagination";
import { paginate } from "../../../utils/paginate";
import { AiOutlineSearch, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import "../../../styles/dashboardCss/ratesContent.css";

const RatesDashboard = ({
  allData,
  searchQuery,
  handelSearch,
  currentPage,
  handelPageChange,
}) => {
  const [pageSize, setpageSize] = useState(20);

  let allPosts = allData[1];

  let filterPosts = allPosts.filter((post) =>
    post.chaletName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const postsArray = paginate(filterPosts, currentPage, pageSize);

  return (
    <React.Fragment>
      <p style={{ color: "gray" }}>
        <FaRegStar /> Rates
      </p>
      <div className="search-users">
        <div className="search-users-icon">
          <AiOutlineSearch />
        </div>
        <div className="">
          <input
            className="form-control input-position"
            placeholder="Search by chalet name..."
            value={searchQuery}
            onChange={(e) => handelSearch(e.target.value)}
          />
        </div>
      </div>
      <br />
      {allPosts && filterPosts && postsArray ? (
        <div className="dashboard-rates-container">
          <div className="barinfo-rate-container">
            <div>Users information</div>
            <div>Chalet information</div>
            <div>Rate</div>
          </div>
          {postsArray.length == 0 && <p>No match chalet ... </p>}
          {postsArray.map((post) => (
            <>
              {post.rate.map((rate) => (
                <div className="single-rate-container">
                  <div className="user-rate-info">
                    <div className="profile-info">@{rate.userName}</div>
                    <div className="profile-info">{rate.fullName}</div>
                  </div>
                  <div className="post-rate-info">
                    <div className="Post-imge">
                      <img
                        src={require(`../../../Photos/${post.image}`).default}
                        alt="User profile image"
                      />
                    </div>
                    <div className="Post-name">{post.chaletName}</div>
                  </div>
                  <div className="rate-given">
                    {rate.rate == 0.5 ? (
                      <>
                        <BsStarHalf color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                      </>
                    ) : rate.rate == 1 ? (
                      <>
                        <AiFillStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                      </>
                    ) : rate.rate == 1.5 ? (
                      <>
                        <AiFillStar color="yellow" />
                        <BsStarHalf color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                      </>
                    ) : rate.rate == 2 ? (
                      <>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                      </>
                    ) : rate.rate == 2.5 ? (
                      <>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <BsStarHalf color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                      </>
                    ) : rate.rate == 3 ? (
                      <>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                      </>
                    ) : rate.rate == 3.5 ? (
                      <>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <BsStarHalf color="yellow" />
                        <AiOutlineStar color="yellow" />
                      </>
                    ) : rate.rate == 4 ? (
                      <>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiOutlineStar color="yellow" />
                      </>
                    ) : rate.rate == 4.5 ? (
                      <>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <BsStarHalf color="yellow" />
                      </>
                    ) : (
                      <>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                      </>
                    )}
                    {/* <AiOutlineStar color="yellow" />
                    <AiFillStar color="yellow" />
                    <BsStarHalf color="yellow" /> */}
                  </div>
                </div>
              ))}
            </>
          ))}
          <Pagination
            itemsCount={filterPosts.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handelPageChange}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default RatesDashboard;
