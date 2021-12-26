import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Route, Redirect, Switch } from "react-router-dom";
import http from "../../../Services/httpService";
import StripeCheckout from "react-stripe-checkout";
import PaymentPage from "../paymentGateway/paymentContainer";
// import Calendar from "react-datepicker";
// import "react-calendar/dist/Calendar.css";
import "../../../styles/reservation.css";
import { error } from "@chakra-ui/utils";
import { toast } from "react-toastify";

const EndPoint = "http://localhost:5000/home/chalet";

const Reservation = ({
  posts,
  user,
  sendReserveRequest,
  payForReserveRequests,
}) => {
  const { id } = useParams();
  let singleChalet = posts.filter((e) => e._id === id);

  const [post, setpost] = useState(singleChalet[0]);
  const [date, setdate] = useState("");
  const [suggestPrice, setsuggestPrice] = useState(post.price);
  const [paid, setpaid] = useState(true);
  const [Token, setToken] = useState("");
  const [allReservas, setallReservas] = useState([]);

  const checkRes = async () => {
    let { data: backendReserves } = await http.get(EndPoint);
    for (let i of backendReserves) {
      if (date == i.resDate) {
        return toast.warning("Date not avalibale");
      }
    }
    return toast.success("Date avalibale");
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  console.log(disablePastDate());

  return (
    <React.Fragment>
      <div className="reservation-container">
        <h3>Reserve request</h3>

        <label htmlFor="price">Date</label>
        <input
          className="form-control"
          name="date"
          type="date"
          value={date}
          min={disablePastDate()}
          onChange={(e) => {
            setdate(e.target.value);
          }}
        />
        <br />
        <label htmlFor="price">Suggest price</label>
        <input
          className="form-control"
          name="price"
          type="Number"
          value={suggestPrice}
          onChange={(e) => {
            setsuggestPrice(e.target.value);
          }}
        />
        <br />
        <div className="reserve-buttons-container">
          <button
            disabled={date && suggestPrice > 100 ? false : true}
            className="btn btn-secondary"
            onClick={() =>
              sendReserveRequest(
                post.image,
                post.chaletName,
                post.price,
                suggestPrice,
                date,
                user,
                post.userId
              )
            }
          >
            Send request
          </button>
          <div onClick={checkRes}>
            <StripeCheckout
              stripeKey="pk_test_51Js6GuJUCbU6tWHnbiZK0etrW5pCj6heBXlH1zH2uyZIrkC9kLzZAQiHiizi0UgP3hw8Oalxg2qTd0lXnQPvaRSG00hcHsPMx3"
              token={() =>
                payForReserveRequests(
                  paid,
                  post.image,
                  post.chaletName,
                  post.price,
                  post.price,
                  date,
                  user,
                  post.userId
                )
              }
              // amount={post.price * 100}
              image={require(`../../../Photos/${post.image}`).default}
              name={post.chaletName}
              description={`On date: ` + date}
              currency="SAR"
              triggerEvent="onClick"
              panelLabel={`Rent for ${post.price} SAR`}
            >
              <button
                className="btn btn-success"
                disabled={date ? false : true}
              >
                Pay now
              </button>
            </StripeCheckout>
          </div>

          {/* <NavLink to={"/payment/" + id}>
            <button disabled={date ? false : true} className="btn btn-success">
              Pay now
            </button>
          </NavLink> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Reservation;
