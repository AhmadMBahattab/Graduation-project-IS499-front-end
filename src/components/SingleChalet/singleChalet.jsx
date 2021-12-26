import React, { useState } from "react";
import { Redirect, Route, useParams, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import RateForm from "./rateForm";
import Reservation from "./reservationPage/reservation";
import PaymentPage from "./paymentGateway/paymentContainer";
import Comments from "./comments";
import http from "../../Services/httpService";
import {
  FaStar,
  FaDollarSign,
  FaPhoneAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { AiFillCheckSquare } from "react-icons/ai";
import { MdLocationOn, MdPhotoSizeSelectLarge, MdTitle } from "react-icons/md";
import { IoMdStarOutline } from "react-icons/io";
import "../../styles/singleChalet.css";

const EndPoint = "http://localhost:5000/home/chalet";
// bring the data which containe all posts
const SingleChalet = ({ posts, user }) => {
  const { id } = useParams();
  let singleChalet = posts.filter((e) => e._id === id);
  const [post, setpost] = useState(singleChalet[0]);
  const [reserveComponent, setreserveComponent] = useState(false);
  const [rateComponent, setrateComponent] = useState(false);

  const sendReserveRequest = async (
    postImage,
    chaletName,
    orignalPrice,
    suggestPrice,
    resDate,
    user,
    ownerId
  ) => {
    let reserve = {
      postId: id,
      userId: user._id,
      ownerId,
      userName: user.userName,
      fullName: user.firstName + " " + user.lastName,
      postInfo: {
        postImage,
        chaletName,
        orignalPrice,
        suggestPrice,
        phoneNumber: user.phoneNumber,
      },
      resDate,
    };
    const { data: reserveation } = await http.post(
      EndPoint + "/" + id,
      reserve
    );
    console.log(reserveation);
    if (reserveation == "User has request") {
      toast.warning(
        "You already has reserve request, you can't make more than 1 request"
      );
      return;
    }
    if (reserveation == "Date not available") {
      toast.warning("This date not available, chose another date ");
      return;
    }
    if (reserveation == "You can't reserve your chalet") {
      toast.warning("You can't reserve your chalet");
      return;
    }
    toast.success("Reserve request sent successfully");
    setreserveComponent(!reserveComponent);
  };

  const payForReserveRequests = async (
    paid,
    postImage,
    chaletName,
    orignalPrice,
    suggestPrice,
    resDate,
    user,
    ownerId
  ) => {
    let reserve = {
      paid,
      postId: id,
      userId: user._id,
      ownerId,
      userName: user.userName,
      fullName: user.firstName + " " + user.lastName,
      contactNumber: user.phoneNumber,
      postInfo: {
        postImage,
        chaletName,
        orignalPrice,
        suggestPrice,
        phoneNumber: user.phoneNumber,
      },
      resDate,
    };
    const { data: reserveation } = await http.post(
      EndPoint + "/" + id,
      reserve
    );
    console.log(reserveation);
    if (reserveation == "User has request") {
      toast.warning(
        "You already has reserve request, you can't make more than 1 request"
      );
      return;
    }
    if (reserveation == "Date not available") {
      toast.warning("This date not available, chose another date ");
      return;
    }
    if (reserveation == "You can't reserve your chalet") {
      toast.warning("You can't reserve your chalet");
      return;
    }
    console.log(reserveation);
    toast.success("Chalet reserved successfully");
  };
  const rateChalet = async (rate, user, post) => {
    let newRate = {
      userId: user._id,
      userName: user.userName,
      fullName: user.firstName + " " + user.lastName,
      postId: post._id,
      rate,
    };
    const { data: Rate } = await http.put(EndPoint + "/" + id, newRate);
    if (Rate == "user has rate this post") {
      return toast.warning("You can't rate same post multiple times");
    }

    toast.success("Rate successfully add");

    setInterval(() => {
      window.location.reload(true);
    }, 5000);
    setrateComponent(!rateComponent);
  };
  const showReserveComponent = () => {
    setreserveComponent(!reserveComponent);
  };
  const showAndCloseRateComponent = () => {
    setrateComponent(!rateComponent);
    setreserveComponent(false);
  };
  let total = 0;

  return (
    <React.Fragment>
      {/* Bring one post on empty page */}

      {singleChalet[0] === null || singleChalet[0] === undefined ? null : (
        <div className="single-chalete-container">
          {singleChalet.map((item) => (
            <div
              style={{ cursor: "context-menu" }}
              key={item._id}
              className="single-chalete"
            >
              <div className="singleChalet-image">
                <img
                  src={require(`../../Photos/${item.image}`).default}
                  alt="chalet"
                />
                <div className="image-border"></div>
              </div>
              <div className="info">
                <h1>
                  {/* <MdTitle /> */}
                  {item.chaletName}
                </h1>
                <div className="rate">
                  <h4>
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
                  </h4>
                  <p>( {item.rate.length} )</p>
                </div>
                <div className="price">
                  <h4>
                    <FaMoneyBillWave color="green" /> {item.price}
                  </h4>
                </div>
                <div className="phoneNumber">
                  <h4>
                    <FaPhoneAlt color="gray" /> {item.phoneNumber}
                  </h4>
                </div>
                <div className="location">
                  <h4>
                    <MdLocationOn color="gray" /> {item.city},{" "}
                    {item.neighborhood}
                  </h4>
                </div>
                <div className="single-area">
                  <MdPhotoSizeSelectLarge fontSize={35} color="gray" />{" "}
                  {item.chaletHight} x {item.chaletWidth} m^2
                </div>
                <div className="discription">
                  <h5>{item.description}</h5>
                </div>
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
          ))}

          <br />
          {user ? (
            <div className="post-buttons">
              <button
                className={"reserve-btn"}
                onClick={showReserveComponent}
                disabled={user ? false : true}
              >
                Reserve
              </button>
              <button
                className="rate-btn"
                onClick={showAndCloseRateComponent}
                disabled={user ? false : true}
              >
                <IoMdStarOutline size={24} />
                <span> </span>
                Rate
              </button>
              {rateComponent ? (
                <div className="overlay">
                  <RateForm
                    user={user}
                    rateChalet={rateChalet}
                    singleChalet={singleChalet}
                    showAndCloseRateComponent={showAndCloseRateComponent}
                  />
                </div>
              ) : null}

              {reserveComponent ? (
                <div>
                  <Reservation
                    posts={posts}
                    user={user}
                    sendReserveRequest={sendReserveRequest}
                    payForReserveRequests={payForReserveRequests}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="post-buttons">
              <button
                className={"reserve-btn not"}
                onClick={showReserveComponent}
                disabled={user ? false : true}
              >
                Reserve
              </button>
              <button
                className="rate-btn not"
                onClick={showAndCloseRateComponent}
                disabled={user ? false : true}
              >
                <IoMdStarOutline size={24} />
                <span> </span>
                Rate
              </button>
            </div>
          )}
          <div className="comments-container-section">
            <hr />
            <Comments singleChalet={singleChalet[0]} user={user} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SingleChalet;
