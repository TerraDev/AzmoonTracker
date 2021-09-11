import React,{useRef, useState} from 'react'
import '../styles/TopNav.css'
import {NavLink} from 'react-router-dom'
import {getToken , RemoveToken} from '../adapters/User/handleToken'


export default function TopNav () {
    console.log("rendering navbar")
    const exp = useRef(null)
    function unexpand(){
        exp.current.checked=false
    }
    const [jwt,setJwt] = useState(getToken())
    return (
    <nav className="topnav">
        <input type="checkbox" id="res-menu" ref={exp}/>
        <label htmlFor="res-menu">
            <a className="expandable"> ... </a>
        </label>
            <NavLink onClick={unexpand} to="/" exact className="left" activeClassName="active">Home</NavLink>
            <NavLink onClick={unexpand} to="/CreateExam" exact className="left" activeClassName="active">New Exam</NavLink>
            {jwt ? 
            <> 
                <a href="#" className="left">{jwt.username}</a> 
                <a href="#" className="left" onClick={()=>{unexpand();RemoveToken();setJwt(null)}}>Logout</a> 
            </>
            :
            <>
                <NavLink onClick={unexpand} to="/Login" exact className="left" activeClassName="active">Login</NavLink>
                <NavLink onClick={unexpand} to="/Register" exact className="left" activeClassName="active">Register</NavLink>
            </>
            }
            <NavLink onClick={unexpand} to="/ContactUs" exact className="right" activeClassName="active">Contact us</NavLink>
            <NavLink onClick={unexpand} to="/About" exact className="right" activeClassName="active">About</NavLink>
    </nav>
    )
}
