import React,{Component} from 'react'
import '../styles/TopNav.css'

class TopNav extends Component {
    render() {
        return (
        <div className="topnav">
            <a href="#Home" className="active left">Home</a>
            <a href="#my_exams" className="left">my exams</a>
            <a href="#login" className="left">login</a>
            <a href="#contact" className="right">Contact us</a>
            <a href="#about" className="right">About</a>
        </div>
        )
    }
}

export default TopNav