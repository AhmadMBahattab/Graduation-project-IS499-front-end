import React, { Component, useState } from "react";
import EditPost from "./postsControlForm/editPost";
import { toast } from "react-toastify";
import { NavLink, Route } from "react-router-dom";
import Pagination from "../../../components/reUseable/pagination";
import { paginate } from "../../../utils/paginate";
import { AiFillCheckSquare, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { FaStar, FaPhoneAlt, FaMoneyBillWave } from "react-icons/fa";
import {
  MdLocationOn,
  MdDelete,
  MdPhotoSizeSelectLarge,
  MdTitle,
} from "react-icons/md";
import "../../../styles/dashboardCss/postControl.css";
import http from "../../../Services/httpService";

const dashboardPostsEndPoint = "http://localhost:5000/dashboard/posts";

const PostsDashboard = ({
  allData,
  searchQuery,
  handelSearch,
  currentPage,
  handelPageChange,
  deletePost,
}) => {
  const [pageSize, setpageSize] = useState(10);
  const [openEditPost, setopenEditPost] = useState(false);
  let postsArr = allData[1];
  console.log(postsArr);

  const updatePostOfBackend = async (
    _id,
    chaletName,
    ownerName,
    price,
    chaletHight,
    chaletWidth,
    description,
    image,
    pitches,
    type,
    city,
    neighborhood
  ) => {
    let updetePost = {};
    let postsArr = [...allData[1]];
    for (let i = 0; i < postsArr.length; i++) {
      if (postsArr[i]._id === _id) {
        updetePost = { ...postsArr[i] };
        updetePost.chaletName = chaletName;
        updetePost.ownerName = ownerName;
        updetePost.price = price;
        updetePost.chaletHight = chaletHight;
        updetePost.chaletWidth = chaletWidth;
        updetePost.description = description;
        updetePost.image = image;
        updetePost.pitches = pitches;
        updetePost.type = type;
        updetePost.city = city;
        updetePost.neighborhood = neighborhood;
        updetePost.postEdited = true;

        // console.log(updetePost, index, _id);
      }
    }
    if (updetePost.type.length == 0) {
      return toast.error("Choose chalet type");
    }
    let { data } = await http.put(
      dashboardPostsEndPoint + "/" + _id,
      updetePost
    );
    window.location = "/dashboard/posts";
    // toast.success("Post has update ");
    // console.log(data);
    setopenEditPost(!openEditPost);
  };

  const openAndCloseEditPostForm = () => {
    setopenEditPost(!openEditPost);
  };

  let filterdPosts = postsArr.filter((post) =>
    post.chaletName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chalets = paginate(filterdPosts, currentPage, pageSize);
  return (
    <React.Fragment>
      <p style={{ color: "gray" }}>
        <IoIosImages /> Posts
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
      {openEditPost && postsArr.length > 0 ? (
        <Route path={`/dashboard/posts/:id`}>
          <div className="overlay">
            <EditPost
              posts={postsArr}
              updatePost={updatePostOfBackend}
              openAndCloseEditPostForm={openAndCloseEditPostForm}
            />
          </div>
        </Route>
      ) : null}

      <div className="dashboard-posts-container">
        {chalets.length == 0 && <p>No chalet name match...</p>}
        {chalets.map((item) => (
          <div
            className="dashboard-single-post"
            key={item._id}
            style={{ cursor: "default" }}
          >
            <div className="dashboard-image-checkbox-container">
              <div className="dashboard-post-image">
                <img
                  src={require(`../../../Photos/${item.image}`).default}
                  alt="chalet"
                />
              </div>
              <div className="myChalet-all-checkbox-container">
                <p style={{ color: "gray", fontSize: 20 }}>Chalet contain</p>
                <div className="myChalet-pitches-checkbox">
                  {" "}
                  {item.pitches.length == 0 && (
                    <p style={{ color: "gray", fontSize: 15 }}>
                      There are no pitches...{" "}
                    </p>
                  )}
                  {item.pitches.map((i) => (
                    <p key={i} style={{ fontSize: 20 }}>
                      <AiFillCheckSquare color="#1E90FF" />
                      {" " + i + " "}
                    </p>
                  ))}
                </div>
                <p style={{ color: "gray", fontSize: 20 }}>Chalet for</p>
                <div className="myChalet-type-checkbox">
                  {item.type.map((i) => (
                    <p key={i} style={{ fontSize: 20 }}>
                      <AiFillCheckSquare color="#1E90FF" />
                      {" " + i + " "}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="dashboard-post-info">
              <NavLink to={`/dashboard/posts/${item._id}`}>
                <button
                  className="edit-icon-button"
                  onClick={openAndCloseEditPostForm}
                >
                  {" "}
                  <AiFillEdit fontSize={25} color="deepskyblue" />
                </button>
              </NavLink>

              <button className="delete-icon-button">
                <MdDelete
                  fontSize={25}
                  color="red"
                  onClick={() => deletePost(item)}
                />
              </button>
              <div className="dashboard-post-name">
                <h2>
                  {" "}
                  <MdTitle />
                  {item.chaletName}
                </h2>
              </div>
              <div className="dashboard-post-rate">
                <h3>
                  <FaStar color="yellow" />{" "}
                  <span>
                    {(
                      Number(
                        item.rate.reduce((pre, curre) => {
                          return pre + curre.rate;
                        }, 0)
                      ) / item.rate.length
                    ).toFixed(1)}
                  </span>{" "}
                </h3>
                <p>( {item.rate.length} )</p>
              </div>
              <div className="dashboard-post-price">
                <h3>
                  <FaMoneyBillWave color="green" /> {item.price} SAR
                </h3>
              </div>
              <div className="dashboard-post-phoneNumber">
                <h4>
                  <FaPhoneAlt color="gray" /> {item.phoneNumber}
                </h4>
              </div>
              <div className="dashboard-post-location">
                <MdLocationOn fontSize={30} color="gray" /> {item.city}
              </div>
              <div className="dashboard-post-area">
                <MdPhotoSizeSelectLarge fontSize={35} color="gray" />{" "}
                {item.chaletHight} x {item.chaletWidth} m^2
              </div>
              <div className="dashboard-post-discription">
                {`${item.description}`}
              </div>
            </div>
          </div>
        ))}
        <Pagination
          itemsCount={filterdPosts.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handelPageChange}
        />
      </div>
    </React.Fragment>
  );
};

export default PostsDashboard;
