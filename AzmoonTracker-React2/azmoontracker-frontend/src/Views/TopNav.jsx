import React,{Component} from 'react'
import '../styles/TopNav.css'
import {NavLink} from 'react-router-dom'

class TopNav extends Component {
    render() {
        return (
        <div className="topnav">
            <NavLink to="/" exact className="left" activeClassName="active">Home</NavLink>
            <NavLink to="/CreateExam" exact className="left" activeClassName="active">New Exam</NavLink>
            <a href="#login" className="left">login</a>
            <a href="#contact" className="right">Contact us</a>
            <a href="#about" className="right">About</a>
        </div>
        )
    }
}

export default TopNav