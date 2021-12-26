import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { getMyChalets } from "../Services/myChaletesData";
import SearchBox from "./HomeComponent/searchBox";
import AdvanceSearchFiltter from "./HomeComponent/advanceSearch";
import TestMap from "./HomeComponent/chaletsMap";
import MyMapComponent from "./HomeComponent/googleMap";
import MapGl from "./HomeComponent/mapGl";
import Pagination from "./reUseable/pagination";
import SortBy from "./HomeComponent/filterChaletsButtons";
import { paginate } from "../utils/paginate";
import { MdLocationOn, MdTitle } from "react-icons/md";
import { FaStar, FaMoneyBillWave, FaWarehouse } from "react-icons/fa";
import "../styles/post.css";
import "../styles/home.css";
import { toast } from "react-toastify";

class Home extends Component {
  state = {
    postsFromBackEnd: [],
    advanceSearch: {
      minPrice: 0,
      maxPrice: 9999,
      chaletHight: 0,
      chaletWidth: 0,
      city: "",
      neighborhood: "",
      pitches: [],
    },
    pageSize: 8,
    currentPage: 1,
    searchQuery: "",
    opition: [
      { value: "low price", label: "Low price" },
      { value: "high price", label: "High price" },
      { value: "low rate", label: "Low rate" },
      { value: "high rate", label: "High rate" },
      { value: "name", label: "Name A-Z" },
    ],
    map: {
      lng: -70.9,
      lat: 42.35,
      zoom: 9,
    },
  };
  async componentDidMount() {
    const { data } = await getMyChalets();
    const postsFromBackEnd = [...data];

    this.setState({ postsFromBackEnd });
  }

  sortBy = (option) => {
    let postsFromBackEnd = [...this.state.postsFromBackEnd];
    const { value } = option;

    if (value == "low price") {
      postsFromBackEnd.sort((a, b) => Number(a.price) - Number(b.price));
      this.setState({ postsFromBackEnd, currentPage: 1 });
      console.log("low price");
    } else if (value == "high price") {
      postsFromBackEnd.sort((a, b) => Number(b.price) - Number(a.price));
      this.setState({ postsFromBackEnd, currentPage: 1 });
      console.log("high price");
    } else if (value == "low rate") {
      postsFromBackEnd.sort(
        (a, b) =>
          Number(
            a.rate.reduce((pre, curre) => {
              return pre + curre.rate;
            }, 0) / a.rate.length
          ).toFixed(2) -
          Number(
            b.rate.reduce((pre, curre) => {
              return pre + curre.rate;
            }, 0) / b.rate.length
          ).toFixed(2)
      );
      this.setState({ postsFromBackEnd, currentPage: 1 });
      console.log("low rate");
    } else if (value == "high rate") {
      postsFromBackEnd.sort(
        (a, b) =>
          Number(
            b.rate.reduce((pre, curre) => {
              return pre + curre.rate;
            }, 0) / b.rate.length
          ).toFixed(2) -
          Number(
            a.rate.reduce((pre, curre) => {
              return pre + curre.rate;
            }, 0) / a.rate.length
          ).toFixed(2)
      );
      this.setState({ postsFromBackEnd, currentPage: 1 });
      console.log("high price");
    } else if (value == "name") {
      console.log("name");
      let first;
      let second;
      postsFromBackEnd.sort((a, b) => {
        first = a.chaletName.toLowerCase();
        second = b.chaletName.toLowerCase();
        if (first < second) {
          return -1;
        }
        if (first > second) {
          return 1;
        }
        return 0;
      });
      this.setState({ postsFromBackEnd, currentPage: 1 });
    } else return;
  };
  onChangeCity = (e) => {
    let advanceSearch = { ...this.state.advanceSearch };
    advanceSearch.city = e.value;
    console.log(advanceSearch.city);
    this.setState({ advanceSearch });
  };
  onChangeNeighborhood = (e) => {
    let neighborhood = this.state.advanceSearch.neighborhood;
    console.log(neighborhood);
    neighborhood = e.value;
    console.log(neighborhood);
    this.setState({ neighborhood });
  };
  handelSearch = (query) => {
    console.log(query);
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handelPageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };
  handelInputChange = ({ currentTarget: input }) => {
    let advanceSearch = { ...this.state.advanceSearch };
    advanceSearch[input.name] = input.value;

    if (input.name == "pitch") {
      let index = advanceSearch.pitches.indexOf(input.value);
      if (index === -1) {
        advanceSearch.pitches.push(input.value);
      }
      if (index !== -1) {
        advanceSearch.pitches.splice(index, 1);
      }
      console.log("pitchis are : ", advanceSearch.pitches);
    }

    this.setState({ advanceSearch });
  };
  cancelAdvanceSearch = () => {
    window.location = "/";
  };

  applyAdvanceSearch = () => {
    let postsFromBackEnd = [...this.state.postsFromBackEnd];
    let advanceSearch = { ...this.state.advanceSearch };

    const { minPrice, maxPrice, city, chaletHight, chaletWidth, pitches } =
      advanceSearch;

    if (minPrice >= 0 && maxPrice <= 9999) {
      postsFromBackEnd = postsFromBackEnd.filter((post) => {
        return post.price >= minPrice && post.price <= maxPrice;
      });
      console.log(postsFromBackEnd);

      if (chaletHight > 0 && chaletWidth > 0) {
        postsFromBackEnd = postsFromBackEnd.filter((post) => {
          return (
            post.chaletHight >= chaletHight && post.chaletWidth >= chaletWidth
          );
        });
      }
      if (maxPrice > minPrice) {
        if (city == "") {
          if (pitches.length === 1) {
            postsFromBackEnd = postsFromBackEnd.filter((post) => {
              return post.pitches.includes(pitches[0]);
            });
          }
          if (pitches.length === 2) {
            postsFromBackEnd = postsFromBackEnd.filter((post) => {
              return (
                post.pitches.includes(pitches[0]) &&
                post.pitches.includes(pitches[1])
              );
            });
          }
          if (pitches.length === 3) {
            postsFromBackEnd = postsFromBackEnd.filter((post) => {
              return (
                post.pitches.includes(pitches[0]) &&
                post.pitches.includes(pitches[1]) &&
                post.pitches.includes(pitches[2])
              );
            });
          }
        }
        if (city != "") {
          postsFromBackEnd = postsFromBackEnd.filter((post) => {
            return post.city == city;
          });
          console.log(postsFromBackEnd);
          if (pitches.length === 1) {
            postsFromBackEnd = postsFromBackEnd.filter((post) => {
              return post.pitches.includes(pitches[0]);
            });
          }
          if (pitches.length === 2) {
            postsFromBackEnd = postsFromBackEnd.filter((post) => {
              return (
                post.pitches.includes(pitches[0]) &&
                post.pitches.includes(pitches[1])
              );
            });
          }
          if (pitches.length === 3) {
            postsFromBackEnd = postsFromBackEnd.filter((post) => {
              return (
                post.pitches.includes(pitches[0]) &&
                post.pitches.includes(pitches[1]) &&
                post.pitches.includes(pitches[2])
              );
            });
          }
        }
      }
    }
    this.setState({ postsFromBackEnd, currentPage: 1 });
  };

  render() {
    const { user } = this.props;
    const {
      opition,
      advanceSearch,
      currentPage,
      pageSize,
      postsFromBackEnd,
      searchQuery,
    } = this.state;

    //apply search filtring
    let filterdPosts = postsFromBackEnd.filter((post) =>
      post.chaletName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // apply pagination
    const chalets = paginate(filterdPosts, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="chalets-background-container">
          <div className="background-overlay">
            <p className="welcome">Welcome to Estrahtk </p>
            <p className="welcome-description">
              Find the appropriate chalet to spend your holidays and weekends on
              it
            </p>
          </div>
          <div className="chalets-background">
            <div>
              <img
                src={require(`../Photos/background4.jpg`).default}
                alt="chalet"
              />
            </div>
            <div>
              <img
                src={require(`../Photos/background6.jpg`).default}
                alt="chalet"
              />
            </div>
          </div>
        </div>
        <div className="add-chalet">
          {user ? (
            <p>
              <NavLink to="/myChalets">
                <FaWarehouse style={{ marginRight: 10 }} /> Add your chalet in
                Estrahtk
              </NavLink>
            </p>
          ) : (
            <p>
              <NavLink to="/login">
                <FaWarehouse style={{ marginRight: 10 }} /> Add your chalet in
                Estrahtk
              </NavLink>
            </p>
          )}
        </div>
        <div>
          <MapGl posts={postsFromBackEnd} />
        </div>

        {/* <div>
          <TestMap />
        </div> */}

        {/* 
        <div>
          <MyMapComponent
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div> */}

        <SearchBox value={searchQuery} onChange={this.handelSearch} />

        <div className="container home-container">
          {filterdPosts.length === 0 ? (
            <h4>No match chalet !!!</h4>
          ) : (
            <div className="posts-container">
              <div className="sortBy-container">
                {/* <Select onChange={this.sortBy} options={opition}></Select> */}
                <SortBy sortBy={this.sortBy} options={opition} />
              </div>
              {chalets.map((item) => (
                <Link
                  key={item._id}
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/home/chalet/${item._id}`}
                >
                  <div key={item._id} className="singl-post">
                    <div className="home-image">
                      <img
                        src={require(`../Photos/${item.image}`).default}
                        alt="chalet"
                      />
                      <div className="image-border"></div>
                    </div>
                    <div className="info">
                      <h2>
                        {/* <MdTitle /> */} {item.chaletName}
                      </h2>
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
                          </span>
                        </h4>
                        <p>( {item.rate.length} )</p>
                      </div>
                      <div className="price">
                        <h4>
                          <FaMoneyBillWave color="green" /> {item.price} SAR
                        </h4>
                      </div>
                      <div className="myChalet-location">
                        <h4>
                          <MdLocationOn fontSize={30} color="gray" />{" "}
                          {item.city}, {item.neighborhood}
                        </h4>
                      </div>
                      <div className="discription">
                        {/* <h5>{item.description}</h5> */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              <Pagination
                itemsCount={filterdPosts.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handelPageChange}
              />
            </div>
          )}
          <div className="advanced-filtter-container">
            <AdvanceSearchFiltter
              advanceSearch={advanceSearch}
              handelInputChange={this.handelInputChange}
              onChangeCity={this.onChangeCity}
              applyAdvanceSearch={this.applyAdvanceSearch}
              cancelAdvanceSearch={this.cancelAdvanceSearch}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
