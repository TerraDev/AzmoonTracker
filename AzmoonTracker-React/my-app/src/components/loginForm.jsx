import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

import { Route, Link } from "react-router-dom";
import RegisterForm from "./registerForm";

import "./createExam.css";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().email().label("Password"),
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
    this.props.history.replace("/");
  };

  render() {
    return (
      <div className="container main_exam">
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}

          <div>
            <Link to="/register">Register</Link>
          </div>

          <Route path="/register" component={RegisterForm} />
        </form>
      </div>
    );
  }
}

export default LoginForm;
