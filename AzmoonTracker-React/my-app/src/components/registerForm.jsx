import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

import { Route, Link } from "react-router-dom";
import LoginForm from "./loginForm";

import "./createExam.css";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", email: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(8).max(20).label("Password"),
    email: Joi.string().required().email().label("Email"),
  };

  doSubmit = () => {
    //Call the server
    console.log("Registerd");
    this.props.history.replace("/");
  };

  render() {
    return (
      <div className="container main_exam">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("email", "Email")}
          {this.renderButton("Register")}

          <div>
            <Link to="/login">Login</Link>
          </div>

          <Route path="/login" component={LoginForm} />
        </form>
      </div>
    );
  }
}

export default RegisterForm;
