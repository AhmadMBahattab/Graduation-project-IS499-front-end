import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import http from "../Services/httpService";
import SideNav from "./My Chalets Pages/myChaletsPage/myChaletsSideNav";
import MyChaletsPage from "./My Chalets Pages/myChaletsPage/myChaletsPage";
import MyNextReserve from "./My Chalets Pages/upComingReservations/myNextReserve";
import ReservationsRequests from "./My Chalets Pages/upComingReservations/reservationsRequests";
import CanceledRequests from "./My Chalets Pages/upComingReservations/canceldRequests";
import MyChaletsReservations from "./My Chalets Pages/upComingReservations/myChaletsReservations";
import OldReservations from "./My Chalets Pages/myOldReservations/oldReservations";
import MyClentsOldRes from "./My Chalets Pages/myClientsOldRes/clentsOldRes";

import "../styles/myChalets.css";

const requestsEndPoint = "http://localhost:5000/myChalets/reservationsRequests";

const myNextReserveEndPoint =
  "http://localhost:3000/myChalets/upcomingReservations";

class myChalets extends Component {
  state = {
    allResRequests: [],
    allCanceledRequests: [],
    searchQuery: "",
    currentPage: 1,
  };

  async componentDidMount() {
    let { data: allResRequests } = await http.get(requestsEndPoint);
    let { data: allCanceledRequests } = await http.get(myNextReserveEndPoint);

    this.setState({ allResRequests, allCanceledRequests });
  }
  handelSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handelPageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  todayDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  render() {
    const { user } = this.props;
    const { allResRequests, allCanceledRequests, searchQuery, currentPage } =
      this.state;

    let filterdRequests = allResRequests.filter((resReq) => {
      return resReq.ownerId === user._id;
    });
    let filterCanceledRequests = allCanceledRequests.filter((resReq) => {
      return resReq.userAndpostInfo.ownerId === user._id;
    });
    let requestsNumber = allResRequests.filter((resReq) => {
      return (
        resReq.ownerId === user._id &&
        resReq.reqState.requestAccept == false &&
        resReq.reqState.requestReject == false
      );
    }).length;

    let acceptedRequests = allResRequests.filter((resReq) => {
      return (
        resReq.ownerId === user._id &&
        resReq.reqState.requestAccept == true &&
        resReq.reqState.requestReject == false
      );
    }).length;
    let canceledRequests = allCanceledRequests.filter((resReq) => {
      return resReq.userAndpostInfo.ownerId === user._id;
    }).length;

    const myNextReserve = allResRequests.filter((resReq) => {
      return resReq.userId === user._id;
    });

    return (
      <div className="myChalets">
        <SideNav user={user} />
        {user && allResRequests && allCanceledRequests ? (
          <div className="myChalets-mane-area">
            <Switch>
              <Route path={"/myChalets/myChaletsPage/" + user._id}>
                <MyChaletsPage user={user} />
              </Route>
              {myNextReserve ? (
                <Route path={"/myChalets/upcomingReservations/" + user._id}>
                  <MyNextReserve
                    user={user}
                    todayDate={this.todayDate}
                    myNextReserve={myNextReserve}
                    requestsNumber={requestsNumber}
                    acceptedRequests={acceptedRequests}
                    canceledRequests={canceledRequests}
                  />
                </Route>
              ) : null}

              <Route path={"/myChalets/myChaletsReservations/" + user._id}>
                <MyChaletsReservations
                  user={user}
                  allResRequests={allResRequests}
                  todayDate={this.todayDate}
                  requestsNumber={requestsNumber}
                  acceptedRequests={acceptedRequests}
                  canceledRequests={canceledRequests}
                />
              </Route>
              <Route path={"/myChalets/canceledRequests/" + user._id}>
                <CanceledRequests
                  user={user}
                  filterdRequests={filterdRequests}
                  filterCanceledRequests={filterCanceledRequests}
                  requestsNumber={requestsNumber}
                  acceptedRequests={acceptedRequests}
                  canceledRequests={canceledRequests}
                />
              </Route>
              <Route path={"/myChalets/reservationsRequests/" + user._id}>
                <ReservationsRequests
                  user={user}
                  filterdRequests={filterdRequests}
                  requestsNumber={requestsNumber}
                  acceptedRequests={acceptedRequests}
                  canceledRequests={canceledRequests}
                />
              </Route>

              <Route path={"/myChalets/oldReservations/" + user._id}>
                <OldReservations
                  user={user}
                  searchQuery={searchQuery}
                  currentPage={currentPage}
                  handelSearch={this.handelSearch}
                  handelPageChange={this.handelPageChange}
                />
              </Route>

              <Route path={"/myChalets/myclientsoldreserves/" + user._id}>
                <MyClentsOldRes
                  user={user}
                  searchQuery={searchQuery}
                  currentPage={currentPage}
                  handelSearch={this.handelSearch}
                  handelPageChange={this.handelPageChange}
                />
              </Route>

              <Redirect
                from="/myChalets"
                exact
                to={"/myChalets/myChaletsPage/" + user._id}
              />
              {/* <Redirect to="/not-found" /> */}
            </Switch>
          </div>
        ) : null}
      </div>
    );
  }
}

export default myChalets;
