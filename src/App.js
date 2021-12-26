import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import * as JWTDecode from "jwt-decode";
import { getMyChalets } from "./Services/myChaletesData";
import NavBar from "./components/Navigation Bar/NavBar";
import Routes from "./components/routes";
import Footer from "./components/reUseable/footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    user: null,
  };
  componentDidMount() {
    try {
      let jwt = localStorage.getItem("token");
      let user = JWTDecode(jwt);
      this.setState({ user });
    } catch (error) {
      console.log("no token save in the browser ");
    }
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="main-container">
          <div className="main-flex">
            <NavBar user={this.state.user} />
            <Routes user={this.state.user} />
          </div>

          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
