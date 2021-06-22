import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Link id="toExams" to="/my-exams">
            <img
              id="SiteLogo"
              src="./AzmoonTrackerLogo.png"
              alt="AzmoonTrackerLogo"
            />
          </Link>
          <h1 id="SiteTitle">
            <Link id="toExams" to="/my-exams">
              Azmoon Tracker
            </Link>
          </h1>
        </div>
        <div className="ad"></div>
        <footer>
          {" "}
          <hr /> © Behdad Alagha{" "}
        </footer>
      </React.Fragment>
    );
  }
}

export default Home;
