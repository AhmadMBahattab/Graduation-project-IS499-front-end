import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { getAllChalets } from "../Services/allChaletsService";
import Home from "../components/Home";
import ProjectInfo from "./reUseable/projectInfo";
import ContactForm from "./reUseable/contactForm";
import MyChalets from "../components/myChalets";
import SingleChalet from "../components/SingleChalet/singleChalet";
import Reservation from "../components/SingleChalet/reservationPage/reservation";
import PaymentPage from "../components/SingleChalet/paymentGateway/paymentContainer";
import Login from "../components/Forms/loginForm";
import Logout from "./logout";
import SignUp from "./Forms/SignUp";
import Profile from "./Profile/Profile";
import NotFound from "../components/notFound";
import Dashboard from "./Dashboard/dashboard";
import "../App.css";

class Routes extends Component {
  state = {
    postsFromBackEnd: [],
  };
  async componentDidMount() {
    const { data } = await getAllChalets();
    const postsFromBackEnd = [...data];
    this.setState({ postsFromBackEnd });
  }
  render() {
    const { postsFromBackEnd } = this.state;
    const { user } = this.props;
    return (
      <Switch>
        <Route path={"/payment/:id"}>
          <PaymentPage />
        </Route>
        <Route path="/home/chalet/:id">
          <SingleChalet posts={postsFromBackEnd} user={user} />
        </Route>
        {/* <Route path="/reservation/:id">
          <Reservation posts={postsFromBackEnd} user={user} />
        </Route> */}
        <Route path="/home">
          <Home user={user} />
        </Route>

        <Route path="/myChalets">
          <MyChalets user={user} />
        </Route>

        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/profile">
          <Profile user={user} />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/projectInfo" component={ProjectInfo} />
        <Route path="/contact" component={ContactForm} />
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

export default Routes;
