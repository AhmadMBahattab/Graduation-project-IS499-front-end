import React, { Component, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const PaymentPage = () => {
  const [Token, setToken] = useState("");
  const handeleToken = (token, address) => {
    setToken(token);
    let value = Token;
    console.log(value);
  };
  return (
    <div>
      payment page
      <StripeCheckout
        stripeKey="pk_test_51Js6GuJUCbU6tWHnbiZK0etrW5pCj6heBXlH1zH2uyZIrkC9kLzZAQiHiizi0UgP3hw8Oalxg2qTd0lXnQPvaRSG00hcHsPMx3"
        token={handeleToken}
      />
    </div>
  );
};

export default PaymentPage;
