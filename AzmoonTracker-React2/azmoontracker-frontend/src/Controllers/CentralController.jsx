
import React,{Component} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import TopNav from "../Views/TopNav"
import Login from "../Views/User/Login"
import Register from "../Views/User/Register"
import NotFound from "../Views/NotFound";
import "../styles/Layout.css"
import MainExamsView from "../Views/Exams/MainExamsView";
//import PRE_TakeExam from "../Views/TakeExam/PRE-TakeExam";
import PRE_ExamCreation from "../Views/ExamCreation/PRE-ExamCreation";
import PRE_Participate from "../Views/Participate/PRE-Participate";

class CentralController extends Component {
    render(){
        return (
            <>
                <Router>
                    <TopNav />
                    <div className="container">
                    <Switch>
                        <Route exact path="/" component={MainExamsView} />
                        <Route exact path="/CreateExam/:ExamId?" component={PRE_ExamCreation} />
                        <Route exact path="/TakeExam/:ExamId" component={PRE_Participate} />
                        <Route exact path="/Login" component={Login} />
                        <Route exact path="/Register" component={Register} />
                        <Route component={NotFound} />
                    </Switch>
                    </div>
                </Router>
                <div className="ad"></div>
                <footer> <hr/> © Behdad Alagha </footer>
            </>
        )
    }
}

export default CentralController
