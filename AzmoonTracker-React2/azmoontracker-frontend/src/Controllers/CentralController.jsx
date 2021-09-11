
import React,{Component} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import TopNav from "../Views/TopNav"
import Login from "../Views/User/Login"
import Register from "../Views/User/Register"
import NotFound from "../Views/NotFound";
import "../styles/Layout.css"
//import MainExamsView from "../Views/Exams/MainExamsView";
import PRE_ExamCreation from "../Views/ExamCreation/PRE-ExamCreation";
import PRE_Participate from "../Views/Participate/PRE-Participate";
import PRE_Answers from "../Views/Participate/PRE-Answers";
import Proctor from "../Views/Participate/Proctor";
import Landing from "../Views/LandingPage";
import ContactUs from "../Views/ContactUs";
import About from "../Views/About";

class CentralController extends Component {
    render(){
        return (
            <>
                <Router>
                    <TopNav />
                    <div className="container">
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/CreateExam/:ExamId?" component={PRE_ExamCreation} />
                        <Route exact path="/TakeExam/:ExamId" component={PRE_Participate} />
                        <Route exact path="/Answers/:ExamId/:StudentId?" component={PRE_Answers} />
                        <Route exact path="/Proctor/:ExamId" component={Proctor} />
                        <Route exact path="/Login" component={Login} />
                        <Route exact path="/Register" component={Register} />
                        <Route exact path="/ContactUs" component={ContactUs} />
                        <Route exact path="/About" component={About} />
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
