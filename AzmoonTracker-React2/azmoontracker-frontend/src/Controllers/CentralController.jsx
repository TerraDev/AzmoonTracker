import React,{Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExamCreation from '../Views/ExamCreation/ExamCreation'
import TakeExam from "../Views/TakeExam/TakeExam";
import ExamsController from './ExamsController'
import TopNav from "../Views/TopNav"
import "../styles/Layout.css"


class CentralController extends Component {
    render(){
        return (
            <>
                <Router>
                    <TopNav />
                    <div className="container">
                        <Route path="/" exact component={ExamsController} />
                        <Route path="/CreateExam" exact component={ExamCreation} />
                        <Route path="/TakeExam" exact component={TakeExam} />
                    </div>
                </Router>
                <div className="ad"></div>
                <footer> <hr/> © Behdad Alagha </footer>
            </>
        )
    }
}

export default CentralController