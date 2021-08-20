import React,{useState} from 'react'
import '../styles/TopNav.css'
import {NavLink} from 'react-router-dom'
import {checkforToken} from '../adapters/User/handleToken'


export default function TopNav () {
    console.log("ikea")
    const [jwt,setJwt] = useState(checkforToken())
    return (
    <div className="topnav">
        <NavLink to="/" exact className="left" activeClassName="active">Home</NavLink>
        <NavLink to="/CreateExam" exact className="left" activeClassName="active">New Exam</NavLink>
        {jwt ? <a href="#" className="left">{jwt}</a>
        :<NavLink to="/Login" exact className="left" activeClassName="active">Login</NavLink>
        }
        <a href="#contact" className="right">Contact us</a>
        <a href="#about" className="right">About</a>
    </div>
    )
}

