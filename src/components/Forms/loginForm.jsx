import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Input from "./reUsableInput/logInInput";
import { login } from "../../Services/authService";
import joi from "joi";
import "../../styles/login.css";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    account: { email: "", password: "" },
    errors: {},
  };

  schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });
  validateForm = () => {
    const { error } = this.schema.validate(this.state.account);
    if (!error) return;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProprty = ({ name, value }) => {
    const obj = joi.object({
      [name]: value,
    });
    const schema = { [name]: this.schema[name] };
    const { error } = obj.validate(schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMassge = this.validateProprty(input);
    if (errorMassge) errors[input.name] = errorMassge;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  handleSubmite = () => {
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;
  };
  doSubmit = async (e) => {
    e.preventDefault();
    try {
      const { account } = this.state;
      const user = await login(account.email, account.password);
      if (account.password == "" || account.email == "") {
        return;
      }
      if (user.data == "Invalid email or password !! ") {
        return toast.error("Invalid email or password !! ");
      }
      localStorage.setItem("token", user.data);
      console.log("Login function work ", user);
      window.location = "/";
    } catch (error) {
      console.log("Error in login " + error);
    }
  };
  render() {
    const { account, errors } = this.state;

    return (
      <div className=" login-form center ">
        <h1>Log in</h1>
        <form onSubmit={this.doSubmit}>
          <div className="txt_field">
            <Input
              id="email"
              name="email"
              label="Email"
              type="text"
              value={account.email}
              onChange={this.handleChange}
              error={errors.email}
            />
          </div>
          <div className="txt_field">
            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              value={account.password}
              onChange={this.handleChange}
              error={errors.password}
            />
          </div>
          <div className="pass">Forgot Password?</div>
          <input type="submit" value="Login" onClick={this.handleSubmite} />
          {/* <button type="submit" value="Login" disabled={this.validateForm()}>
            test
          </button> */}
          <div className="signup_link">
            Not a member? <NavLink to="/register">Signup</NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
