import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { toast } from "react-toastify";
import * as JWTDecode from "jwt-decode";
import http from "../../../Services/httpService";
import {
  getMyChalets,
  saveChalet,
  deletePost,
} from "../../../Services/myChaletesData";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../reUseable/pagination";
import CreatePost from "./createPost";
import EditChalet from "./editChalet";
import EditLocation from "./editLocation";
import {
  FaDollarSign,
  FaStar,
  FaPhoneAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { AiFillEdit, AiOutlineDelete, AiFillCheckSquare } from "react-icons/ai";
import { GoDiffAdded } from "react-icons/go";
import { MdLocationOn, MdPhotoSizeSelectLarge, MdTitle } from "react-icons/md";
import "../../../styles/myChaletePage.css";

const EndPoint = "http://localhost:5000/myChalets/myChaletsPage";

class MyChaletsPage extends Component {
  state = {
    myPostsFromBackEnd: [],
    user: null,
    pageSize: 3,
    currentPage: 1,
    showComponent: false,
    showUpdateComponent: false,
    showEditLocationComponent: false,
    buttonName: "Add post",
  };

  async componentDidMount() {
    try {
      const { data } = await getMyChalets();
      const myPostsFromBackEnd = [...data];
      this.setState({ myPostsFromBackEnd });
    } catch (e) {
      console.log("Error in my chalet page componentDidMount : " + e);
    }
  }

  addPostOfBackend = async (user, post) => {
    try {
      // let config = {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // };

      // let formData = new FormData();
      // formData.append("fileImage", post.fileName, post.fileName.name);

      // console.log(formData.get("fileImage"));

      const newPost = {
        userId: user._id,
        ownerName: user.firstName + " " + user.lastName,
        userName: user.userName,
        chaletName: post.chaletName,
        phoneNumber: user.phoneNumber,
        price: post.price,
        chaletHight: post.chaletHight,
        chaletWidth: post.chaletWidth,
        image: post.image,
        description: post.description,
        pitches: post.pitches,
        city: post.city,
        neighborhood: post.neighborhood,
        type: post.type,
      };
      let myTotalPosts = 0;

      console.log(newPost);

      if (post.type.length == 0) {
        return toast.error("Specify chalet type");
      }
      const { data } = await http.post(EndPoint + "/" + user._id, newPost);
      console.log(data);

      let myPostsFromBackEnd = [...this.state.myPostsFromBackEnd, data];

      for (let post of myPostsFromBackEnd) {
        if (post.userId === user._id) {
          myTotalPosts++;
        }
      }
      if (myTotalPosts > 6) {
        toast.error("You reach your posts limet!!!, delete one to add new one");
        return;
      }

      this.setState({ myPostsFromBackEnd, showComponent: false });
      toast.success("Add post success");
    } catch (e) {
      console.log("something went wrong while adding Post " + e);
    }
  };

  deletePostOfBackend = async (post, userId) => {
    const deletedPost = await deletePost(post);
    let myPostsFromBackEnd = this.state.myPostsFromBackEnd.filter(
      (p) => p._id !== post
    );
    let myTotalPosts = 1;
    for (let post of myPostsFromBackEnd) {
      if (post._id === userId) {
        console.log(post);
        myTotalPosts++;
      }
    }
    if (myTotalPosts === 3) {
      this.setState({ currentPage: 1 });
    }
    if (myTotalPosts === 6) {
      this.setState({ currentPage: 2 });
    }
    toast.success("Delete post success");
    this.setState({ myPostsFromBackEnd });
  };
  updatePostOfBackend = async (
    userId,
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
    let myPostsFromBackEnd = [...this.state.myPostsFromBackEnd];
    for (let i = 0; i < myPostsFromBackEnd.length; i++) {
      if (myPostsFromBackEnd[i]._id === _id) {
        updetePost = { ...myPostsFromBackEnd[i] };
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

        // console.log(updetePost, index, _id);
      }
    }
    if (updetePost.type.length == 0) {
      return toast.error("Choose chalet type");
    }
    let { data } = await http.put(EndPoint + "/" + _id, updetePost);
    window.location = "/myChalets/myChaletsPage/" + userId;
    toast.success("Post has update ");
    console.log(data);
    this.setState({ showUpdateComponent: false });
  };

  updatePostLocation = async (postId, latitude, longitude) => {
    let postInfo = {
      postId,
      editChaletLocation: true,
      chaletLocation: {
        latitude,
        longitude,
      },
    };
    let { data } = await http.put(EndPoint + "/" + postId, postInfo);
    window.location.reload();
    this.setState({ showEditLocationComponent: false });
  };
  handelPageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  openCreatePostComponnent = () => {
    this.setState({ showComponent: true });
  };
  closeCreatePost = () => {
    this.setState({ showComponent: false });
  };
  openAndCloseUpdatePostComponnent = () => {
    if (!this.state.showUpdateComponent) {
      this.setState({ showUpdateComponent: true, showComponent: false });
    }
    if (this.state.showUpdateComponent) {
      this.setState({ showUpdateComponent: false });
    }
  };

  cansleUpdate = (userId) => {
    this.setState({ showUpdateComponent: false });
    window.location = "/myChalets/myChaletsPage/" + userId;
  };

  openLocationEdit = () => {
    this.setState({ showEditLocationComponent: true });
  };
  render() {
    const {
      myPostsFromBackEnd,
      currentPage,
      pageSize,
      buttonState,
      showComponent,
    } = this.state;
    const { user } = this.props;
    let myChalets = myPostsFromBackEnd.filter((post) => {
      return post.userId == user._id;
    });

    const chalets = paginate(myChalets, currentPage, pageSize);

    return (
      //My chaletes page for backend
      <React.Fragment>
        {/* {console.log("tets the props", userOfMyChalet)} */}

        <div className="myChalatePage-Container">
          <button
            onClick={() => this.openCreatePostComponnent(showComponent)}
            className="create-post-btn"
          >
            {/* {this.state.buttonName} */}
            <GoDiffAdded fontSize={35} color="black" />
          </button>

          {this.state.showComponent ? (
            <div className="overlay">
              <CreatePost
                user={user}
                addPostOfBackend={this.addPostOfBackend}
                closeButton={this.state.showComponent}
                closeCreatePost={this.closeCreatePost}
              />
            </div>
          ) : null}

          {this.state.showUpdateComponent ? (
            <Route path={"/myChalets/myChaletsPage/" + user._id + "/:id"}>
              <div className="overlay">
                <EditChalet
                  user={user}
                  posts={myChalets}
                  updatePost={this.updatePostOfBackend}
                  canceleUpdatePost={this.cansleUpdate}
                  buttonState={buttonState}
                />
              </div>
            </Route>
          ) : null}

          {this.state.showEditLocationComponent ? (
            <Route path={"/myChalets/myChaletsPage/" + user._id + "/:id"}>
              <div className="overlay">
                <EditLocation
                  user={user}
                  posts={myChalets}
                  updatePostLocation={this.updatePostLocation}
                  canceleUpdatePost={this.cansleUpdate}
                />
              </div>
            </Route>
          ) : null}

          {user ? (
            <div className="myChaletes-container">
              {myChalets.length == 0 ? (
                <div>
                  <p style={{ color: "gray" }}>You don't have chalets</p>
                </div>
              ) : null}
              {chalets.map((item) => (
                <div
                  key={item._id}
                  style={{ cursor: "default" }}
                  className="myChalet-singleChalete-container"
                >
                  <div className="myChalet-image-container">
                    <div className="myChalet-image">
                      <img
                        src={require(`../../../Photos/${item.image}`).default}
                        alt="chalet"
                      />
                    </div>

                    <div className="myChalet-all-checkbox-container">
                      <p style={{ color: "gray", fontSize: 20 }}>
                        Chalet contain
                      </p>
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
                  <div className="myChalet-info">
                    <Link
                      to={`/myChalets/myChaletsPage/${user._id}/${item._id}`}
                    >
                      <button
                        className="edit-icon-button"
                        onClick={this.openLocationEdit}
                      >
                        <MdLocationOn fontSize={25} color="gray" />
                      </button>
                    </Link>

                    <Link
                      to={`/myChalets/myChaletsPage/${user._id}/${item._id}`}
                    >
                      <button
                        className="edit-icon-button"
                        onClick={this.openAndCloseUpdatePostComponnent}
                      >
                        <AiFillEdit fontSize={25} color="gray" />
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        this.deletePostOfBackend(item._id, user._id)
                      }
                      className="delete-icon-button"
                    >
                      <AiOutlineDelete fontSize={25} color="gray" />
                    </button>
                    <div className="myChalet-name">
                      <h2>
                        {/* <MdTitle /> */}
                        {item.chaletName}
                      </h2>
                    </div>

                    <div className="myChalet-rate">
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
                    <div className="myChalet-price">
                      <h3>
                        <FaMoneyBillWave color="green" /> {item.price} SAR
                      </h3>
                    </div>
                    <div className="myChalet-phoneNumber">
                      {user.roles.hidePhoneNumber ? (
                        <h4>
                          <FaPhoneAlt color="gray" /> None
                        </h4>
                      ) : (
                        <h4>
                          <FaPhoneAlt color="gray" /> {item.phoneNumber}
                        </h4>
                      )}
                    </div>
                    <div className="myChalet-location">
                      <MdLocationOn fontSize={35} color="gray" /> {item.city},{" "}
                      {item.neighborhood}
                    </div>
                    <div className="myChalet-area">
                      <MdPhotoSizeSelectLarge fontSize={35} color="gray" />{" "}
                      {item.chaletHight} x {item.chaletWidth} m^2
                    </div>
                    <div className="myChalet-discription">
                      {`${item.description}`}
                    </div>
                  </div>
                </div>
              ))}
              {user ? (
                <Pagination
                  itemsCount={myChalets.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handelPageChange}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default MyChaletsPage;
