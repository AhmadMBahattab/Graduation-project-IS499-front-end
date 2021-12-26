import React, { Component } from "react";
import http from "../../../Services/httpService";
import Pagination from "../../../components/reUseable/pagination";
import { paginate } from "../../../utils/paginate";
import { AiOutlineSearch } from "react-icons/ai";
import "../../../styles/oldReservesStyles/clientsOldReservation.css";

const myClientsOldReservesEndpoint =
  "http://localhost:5000/myChalets/myclientsoldreserves";

class MyClientsOldRes extends React.Component {
  state = { allOldReqserves: [], pageSize: 4 };

  async componentDidMount() {
    let { data: allOldReqserves } = await http.get(
      myClientsOldReservesEndpoint
    );
    this.setState({ allOldReqserves });
  }

  render() {
    const { user, searchQuery, currentPage, handelSearch, handelPageChange } =
      this.props;
    const { allOldReqserves, pageSize } = this.state;
    console.log(allOldReqserves);
    let filterMyClientsReserves = allOldReqserves.filter((reserve) => {
      return reserve.userAndpostInfo.ownerId == user._id;
    });

    filterMyClientsReserves = filterMyClientsReserves.filter((res) =>
      res.userAndpostInfo.userName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    const myClientsResArray = paginate(
      filterMyClientsReserves,
      currentPage,
      pageSize
    );

    console.log("my clients", filterMyClientsReserves);
    return (
      <React.Fragment>
        <div className="myclients-oldres-container">
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
          <div className="myclients-header-container">
            <p>Chalet image</p>
            <p>Reserve information </p>
            <p>Reserve date</p>
          </div>
          {myClientsResArray.length == 0 ? (
            <p>No old clients reserves</p>
          ) : null}
          {myClientsResArray.length >= 1 &&
            myClientsResArray.map((res) => (
              <div className="single-myclients-oldres-container">
                <div className="myclients-oldres-image">
                  <img
                    src={
                      require(`../../../Photos/${res.userAndpostInfo.postInfo.postImage}`)
                        .default
                    }
                    alt="chalet"
                  />
                </div>
                <div className="myclients-oldres-info">
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
                  <div className="first-col">Suggest price: </div>
                  <div className="first-col">
                    {res.userAndpostInfo.postInfo.suggestPrice} SAR
                  </div>
                </div>
                <div
                  className="myclients-oldres-stats"
                  style={{ color: "red", fontWeight: "bolder" }}
                >
                  {res.userAndpostInfo.resDate}
                </div>
              </div>
            ))}
          <Pagination
            itemsCount={filterMyClientsReserves.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handelPageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default MyClientsOldRes;
