import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import About from "./components/about";
import ContactUs from "./components/contactUs";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import MyExams from "./components/myExams";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import CreateExam from "./components/createExam";
import Quiz from "./components/QuizMain";
import WebCamCheck from "./components/webCam";
import QuestionForm from "./components/questionForm";
import ExamDetails from "./components/examDetails";
import TakeExam from "./components/takeExam";
import ErollmentPage from "./components/enrollPage";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main /*className="container"*/>
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/create-exam/question-form" component={QuestionForm} />
            <Route path="/create-exam" component={CreateExam} />
            <Route path="/about" component={About} />
            <Route
              path="/my-exams/:examId/enroll-page/take-exam"
              component={TakeExam}
            />
            ;
            <Route
              path="/my-exams/:examId/enroll-page"
              component={ErollmentPage}
            />
            ;
            <Route path="/my-exams/:examId" component={ExamDetails} />;
            <Route path="/my-exams/web-cam" component={WebCamCheck} />;
            <Route path="/my-exams/quiz" component={Quiz} />;
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/my-exams" component={MyExams} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
