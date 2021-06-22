import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

const NavBar = () => {
  return (
    <div className="topnav">
      <Link className="active left" to="/">
        Home
      </Link>
      <Link to="/my-exams" className="left">
        my exams
      </Link>
      <Link to="/login" className="left">
        login
      </Link>
      <Link to="/create-exam" className="left">
        Create Exam
      </Link>
      <Link to="/contact-us" className="right">
        Contact us
      </Link>
      <Link to="/about" className="right">
        About
      </Link>
    </div>
  );
};

export default NavBar;
