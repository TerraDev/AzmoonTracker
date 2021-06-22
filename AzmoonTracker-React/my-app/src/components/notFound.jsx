import React, { Component } from "react";
import NavBar from "./navBar";
import "./notFound.css"
class NotFound extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <NavBar
          home="home"
          myExams="my exams"
          login="login"
          cus="Contact us"
          about="About"
        /> */}
        <div class="container">
          <img id="notFound" src="./404_v2.png" alt="404_notFound" />
        </div>
        <div class="ad"></div>
        <footer>
          <hr /> © Behdad Alagha
        </footer>
      </React.Fragment>
    );
  }
}

export default NotFound;
