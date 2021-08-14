
import React,{Component} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import ExamCreation from "../Views/ExamCreation/ExamCreation"
import TopNav from "../Views/TopNav"
import Login from "../Views/User/Login"
import Register from "../Views/User/Register"
import NotFound from "../Views/NotFound";
import "../styles/Layout.css"
import MainExamsView from "../Views/Exams/MainExamsView";
import PRE_TakeExam from "../Views/TakeExam/PRE-TakeExam";

class CentralController extends Component {
    render(){
        return (
            <>
                <Router>
                    <TopNav />
                    <div className="container">
                    <Switch>
                        <Route exact path="/" component={MainExamsView} />
                        <Route exact path="/CreateExam" component={ExamCreation} />
                        <Route exact path="/TakeExam/:ExamId" component={PRE_TakeExam} />
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
