import React, { Component, useState } from "react";
import Pagination from "../../../components/reUseable/pagination";
import { paginate } from "../../../utils/paginate";
import http from "../../../Services/httpService";
import UpComingReservationsNavBar from "./upComingNavBar";
import "../../../styles/myChaletsReservations.css";

const acceptedReservesEndpoint =
  "http://localhost:3000/myChalets/myChaletsReservations";

const MyChaletsReservations = ({
  user,
  allResRequests,
  requestsNumber,
  acceptedRequests,
  canceledRequests,
  todayDate,
}) => {
  const [pageSize, setpageSize] = useState(3);

  let filterRequests = allResRequests.filter((item) => {
    return (
      item.ownerId == user._id &&
      item.reqState.requestSend == true &&
      item.reqState.requestAccept == true &&
      item.reqState.requestReject == false
    );
  });

  console.log(filterRequests);

  const compareDateThenDeleteOldRes = async (arrayOfAcceptedReserves) => {
    for (let reserve of arrayOfAcceptedReserves) {
      if (reserve.resDate.localeCompare(todayDate()) == -1) {
        const { data } = await http.put(acceptedReservesEndpoint, reserve);

        console.log("accepted reserve pasd date", reserve);
      }
    }
    // window.location.reload(1);
    return console.log("reserve did not pass date yet");
  };
  if (filterRequests.length >= 1) {
    compareDateThenDeleteOldRes(filterRequests);
  }

  return (
    <div>
      <UpComingReservationsNavBar
        user={user}
        requestsNumber={requestsNumber}
        acceptedRequests={acceptedRequests}
        canceledRequests={canceledRequests}
        active="acceptRes"
      />
      <div className="reservesOnMyChalets-container">
        {filterRequests.length == 0 ? (
          <p style={{ color: "gray", fontSize: 18 }}>No accepted requests...</p>
        ) : (
          <div className="reservation-header-container">
            <p>Chalet image</p>
            <p>Reserve information </p>
            <p>Reserve status</p>
          </div>
        )}
        {filterRequests.map((item) => (
          <div id={item._id} className="single-reserve">
            <div className="reserve-image">
              <img
                src={
                  require(`../../../Photos/${item.postInfo.postImage}`).default
                }
                alt="chalet"
              />
              <h6></h6>
            </div>
            <div className="reserve-info">
              <div>Username: </div>
              <div>@{item.userName}</div>
              <div className="first-col">Request by:</div>
              <div className="first-col">{item.fullName}</div>
              <div>Chalet name: </div>
              <div>{item.postInfo.chaletName}</div>
              <div className="first-col">On date: </div>
              <div className="first-col">{item.resDate}</div>
              <div>Contact info:</div>
              <div>{item.postInfo.phoneNumber}</div>
              <div className="first-col">Orignal price: </div>
              <div className="first-col">{item.postInfo.orignalPrice} SAR</div>
              <div>Suggest Price: </div>
              <div>{item.postInfo.suggestPrice} SAR</div>
            </div>
            <div className="reserve-state-container">
              <div>
                {item.reqState.requestPaid ? (
                  <p className="pied"> Payed</p>
                ) : (
                  <p className="Not-pied">Not payed</p>
                )}
              </div>
              <p className="accepted">Accepted</p>
            </div>
          </div>
        ))}
        {/* <Pagination
          itemsCount={filterRequests.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handelPageChange}
        /> */}
      </div>
    </div>
  );
};

export default MyChaletsReservations;
