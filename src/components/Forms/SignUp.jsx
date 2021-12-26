import React, { Component } from "react";
import joi from "joi";

import Input from "./reUsableInput/signUpInput";
import { NavLink } from "react-router-dom";
import { registerUser } from "../../Services/userService";
import "../../styles/signUpForm.css";

class SignUp extends Component {
  state = {
    account: {
      firstName: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      email2: "",
      password: "",
      password2: "",
    },
    user: {},
    errors: {},
  };

  schema = joi.object({
    firstName: joi
      .string()
      .min(2)
      .max(10)
      .required()
      .trim()
      .label("First name"),
    lastName: joi.string().min(2).max(15).required().trim().label("Last name"),
    userName: joi.string().min(4).max(20).required().trim().label("User name"),
    phoneNumber: joi.string().min(5).max(10).required().label("Phone number"),
    email: joi.string().email().required().label("Email"),
    email2: joi
      .string()
      .email()
      .required()
      .label("Confirm email")
      .valid(joi.ref("email")),
    password: joi.string().required().label("Password"),
    password2: joi
      .string()
      .required()
      .label("Confirm password")
      .valid(joi.ref("password")),
  });
  validateForm = () => {
    const { error } = this.schema.validate(this.state.account, {
      abortEarly: false,
    });
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
    const { error } = obj.validate(schema, { abortEarly: false });

    return error ? error.details[0].message : null;
  };
  handleSubmite = () => {
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("Register new User complete..");
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
  doSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(this.state.account);
      if (
        user.data == "email not match email2" ||
        user.data == "password not match password2"
      ) {
        console.log(user.data);
        return;
      }

      console.log(user.data);
      localStorage.setItem("token", user.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      console.log("Error in register form !!! :" + error);
    }
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div className="form-content-right form-container">
        <form onSubmit={this.doSubmit} className="form">
          <h1>
            Get started with us today! Create your account by filling out the
            information below.
          </h1>
          <br></br>
          <div className="form-inputs-container">
            <div className="form-inputs-left">
              <div className="form-inputs">
                <Input
                  className="form-input"
                  labelClassName="form-label"
                  id="firstName"
                  name="firstName"
                  label="First name"
                  type="text"
                  value={account.firstName}
                  onChange={this.handleChange}
                  error={errors.firstName}
                />
              </div>
              <div className="form-inputs">
                <Input
                  className="form-input"
                  labelClassName="form-label"
                  id="userName"
                  name="userName"
                  label="username"
                  type="text"
                  value={account.userName}
                  onChange={this.handleChange}
                  error={errors.userName}
                />
              </div>
              <div className="form-inputs">
                <Input
                  className="form-input"
                  labelClassName="form-label"
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={account.email}
                  onChange={this.handleChange}
                  error={errors.email}
                />
              </div>
              <div className="form-inputs">
                <Input
                  className="form-input"
                  labelClassName="form-label"
                  id="password"
                  name="password"
                  label="password"
                  type="password"
                  value={account.password}
                  onChange={this.handleChange}
                  error={errors.password}
                />
              </div>
            </div>
            <div className="form-inputs-right">
              <div className="form-inputs">
                <Input
                  className="form-input"
                  labelClassName="form-label"
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  type="text"
                  value={account.lastName}
                  onChange={this.handleChange}
                  error={errors.lastName}
                />
              </div>

              <div className="form-inputs">
                <Input
                  className="form-input"
                  labelClassName="form-label"
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone number"
                  type="text"
                  value={account.phoneNumber}
                  onChange={this.handleChange}
                  error={errors.phoneNumber}
                />
              </div>
              <div className="form-inputs">
                <Input
                  className="form-input"
                  labelClassName="form-label"
                  id="email2"
                  name="email2"
                  label="Confirm email"
                  type="email"
                  value={account.email2}
                  onChange={this.handleChange}
                  error={errors.email2}
                />
              </div>
              <div className="form-inputs">
                <Input
                  className="form-input"
                  labelClassName="form-label"
                  id="password2"
                  name="password2"
                  label="Confirm password"
                  type="password"
                  value={account.password2}
                  onChange={this.handleChange}
                  error={errors.password2}
                />
              </div>
            </div>
          </div>
          <button
            className="form-input-btn"
            type="submit"
            onClick={this.handleSubmite}
          >
            Sign up
          </button>
          <span className="form-input-login">
            Already have an account? Login <NavLink to="/login">here</NavLink>
          </span>
        </form>
      </div>
    );
  }
}

export default SignUp;
