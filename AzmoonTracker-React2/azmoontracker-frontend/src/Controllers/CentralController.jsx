import React,{Component} from "react";
import ExamsController from './ExamsController'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExamCreationView from '../Views/ExamCreation/ExamCreationView'
import TopNav from "../Views/TopNav"
import "../styles/Layout.css"

class CentralController extends Component {
    render(){
        return (
            <>
                <TopNav />
                <div className="container">
                    <ExamCreationView /> 
                </div>
                <div className="ad"></div>
                <footer> <hr/> © Behdad Alagha </footer>
            </>
        )
    }
}

export default CentralController