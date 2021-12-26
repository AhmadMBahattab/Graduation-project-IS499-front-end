import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Pagination from "../../../components/reUseable/pagination";
import { paginate } from "../../../utils/paginate";
import { AiOutlineSearch } from "react-icons/ai";
import http from "../../../Services/httpService";

import "../../../styles/oldReservesStyles/oldReservation.css";

const myOldReservesEndpoint = "http://localhost:5000/myChalets/oldReservations";

class OldReservations extends Component {
  state = { allOldReqserves: [], pageSize: 4 };

  async componentDidMount() {
    let { data: allOldReqserves } = await http.get(myOldReservesEndpoint);
    this.setState({ allOldReqserves });
  }

  render() {
    const { user, searchQuery, currentPage, handelSearch, handelPageChange } =
      this.props;
    const { allOldReqserves, pageSize } = this.state;

    let filterMyReserves = allOldReqserves.filter((reserve) => {
      return reserve.userAndpostInfo.userId == user._id;
    });
    filterMyReserves = filterMyReserves.filter((res) =>
      res.userAndpostInfo.resDate
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    const myReservesArray = paginate(filterMyReserves, currentPage, pageSize);
    console.log(filterMyReserves);
    return (
      <React.Fragment>
        <div className="myold-res-container">
          <div className="search-users">
            <div className="search-users-icon">
              <AiOutlineSearch />
            </div>
            <div className="">
              <input
                className="form-control input-position"
                placeholder="Search by reserve date... (e.g. 2021-10-20 )"
                value={searchQuery}
                onChange={(e) => handelSearch(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="myold-header-container">
            <p>Chalet image</p>
            <p>Reserve information </p>
            <p>Reserve date</p>
          </div>
          {myReservesArray.length == 0 ? <p>No match date</p> : null}
          {myReservesArray.length >= 1 &&
            myReservesArray.map((res) => (
              <div className="single-oldres">
                <div className="oldres-image">
                  <img
                    src={
                      require(`../../../Photos/${res.userAndpostInfo.postInfo.postImage}`)
                        .default
                    }
                    alt="chalet"
                  />
                  <h6></h6>
                </div>
                <div className="oldres-info">
                  <div>Username: </div>
                  <div>@{res.userAndpostInfo.userName}</div>
                  <div className="first-col">Request by:</div>
                  <div className="first-col">
                    {res.userAndpostInfo.fullName}
                  </div>
                  <div>Chalet name: </div>
                  <div>{res.userAndpostInfo.postInfo.chaletName}</div>
                  <div className="first-col">Contact info:</div>
                  <div className="first-col">
                    {res.userAndpostInfo.postInfo.phoneNumber}
                  </div>
                  <div>Orignal price: </div>
                  <div>{res.userAndpostInfo.postInfo.orignalPrice} SAR</div>
                  <div className="first-col">Suggest Price: </div>
                  <div className="first-col">
                    {res.userAndpostInfo.postInfo.suggestPrice} SAR
                  </div>
                </div>
                <div
                  className="oldres-state-container"
                  style={{ color: "red", fontWeight: "bolder" }}
                >
                  {res.userAndpostInfo.resDate}
                </div>
              </div>
            ))}
          <Pagination
            itemsCount={filterMyReserves.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handelPageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default OldReservations;
