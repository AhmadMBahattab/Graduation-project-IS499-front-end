import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import DashboardNavBar from "./dashboardNav";
import Main from "./contents/main";
import UsersDashboard from "./contents/users";
import PostsDashboard from "./contents/posts";
import CommentsDashboard from "./contents/comments";
import RatesDashboard from "./contents/rates";
import Messages from "./contents/Messages";
import http from "../../Services/httpService";
import "../../styles/dashboardCss/dashboard.css";
import { toast } from "react-toastify";

const dashboardEndPoint = "http://localhost:5000/dashboard";
const dashboardPostsEndPoint = "http://localhost:5000/dashboard/posts";
const dashboardCommentsEndPoint = "http://localhost:5000/dashboard/comments";

class Dashboard extends React.Component {
  state = {
    allData: [],
    searchQuery: "",
    currentPage: 1,
  };

  async componentDidMount() {
    const { data: allDataFromBackend } = await http.get(dashboardEndPoint);
    const allData = [...allDataFromBackend];
    console.log(allData);
    this.setState({ allData });
  }
  deletePost = async (post) => {
    let allData = [...this.state.allData];
    let { data: deletedPost } = await http.put(dashboardPostsEndPoint, post);
    allData[1] = allData[1].filter((item) => {
      return item._id != post._id;
    });
    toast.success("Post deleted");
    this.setState({ allData, currentPage: 1, searchQuery: "" });
  };
  deleteComment = async (comment) => {
    console.log("delete comment work", comment);
    let allData = [...this.state.allData];
    let { data: deleteComment } = await http.put(
      dashboardCommentsEndPoint,
      comment
    );
    allData[2] = allData[2].filter((item) => {
      return item._id != comment._id;
    });
    toast.success("Comment deleted");
    this.setState({ allData, currentPage: 1, searchQuery: "" });
  };

  handelSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handelPageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  render() {
    const { allData, searchQuery, currentPage } = this.state;
    // console.log(this.state.allData[1]);
    return (
      <div className="dashboard-container">
        {allData[4] ? (
          <DashboardNavBar massgesNumber={allData[4].length} />
        ) : null}
        {allData &&
        allData[0] &&
        allData[1] &&
        allData[2] &&
        allData[3] &&
        allData[4] ? (
          <div className="main-dashboard-content">
            <Switch>
              <Route path="/dashboard/main">
                <Main allData={allData} />
              </Route>
              <Route path="/dashboard/users">
                <UsersDashboard
                  allData={allData}
                  searchQuery={searchQuery}
                  currentPage={currentPage}
                  handelSearch={this.handelSearch}
                  handelPageChange={this.handelPageChange}
                />
              </Route>
              <Route path="/dashboard/posts">
                <PostsDashboard
                  allData={allData}
                  searchQuery={searchQuery}
                  currentPage={currentPage}
                  handelSearch={this.handelSearch}
                  handelPageChange={this.handelPageChange}
                  deletePost={this.deletePost}
                />
              </Route>
              <Route path="/dashboard/comments">
                <CommentsDashboard
                  allData={allData}
                  searchQuery={searchQuery}
                  currentPage={currentPage}
                  handelSearch={this.handelSearch}
                  handelPageChange={this.handelPageChange}
                  deleteComment={this.deleteComment}
                />
              </Route>
              <Route path="/dashboard/rates">
                <RatesDashboard
                  allData={allData}
                  searchQuery={searchQuery}
                  currentPage={currentPage}
                  handelSearch={this.handelSearch}
                  handelPageChange={this.handelPageChange}
                />
              </Route>
              <Route path="/dashboard/messages">
                <Messages allData={allData} />
              </Route>
              <Redirect from="/dashboard" to="/dashboard/main" />
            </Switch>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Dashboard;
