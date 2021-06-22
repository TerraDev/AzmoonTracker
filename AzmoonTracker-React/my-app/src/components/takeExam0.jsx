import React, { Component } from "react";
import axios from "axios";
import ExamTabs from "./examTabs";

import "./takeExam.css";

class TakeExam extends Component {
  state = {
    examId: "",
    answerText: "",
    exam: [],
    questions: [],
    answers: [],
  };
  async componentDidMount() {
    const { data: examsDetails } = await axios.get(
      "https://run.mocky.io/v3/1efb72d8-0bcc-4b1c-af64-94d2170516e4"
    );

    const examDetails = examsDetails.find(
      (obj) => obj.examId === this.props.match.params.examId
    );

    const questions = examDetails.questions;
    this.setState({ examId: this.props.match.params.examId });
    this.setState({ exam: examDetails });
    this.setState({ questions });
    // console.log(typeof this.state.examId);
    // console.log(questions);
  }

  handelChange = (answer) => {
    console.log(answer);
    const answers = [...this.state.answers];
    const index = answers.findIndex((ans) => {
      return ans.questionId === answer.questionId;
    });
    console.log(index);
    if (answers.length === 0 || index < 0) {
      answers.push(answer);
    } else {
      answers[index] = answer;
    }
    this.setState({ answers });

    console.log("answer???");
    console.log(this.state.answers);
  };

  showValue = (questionId) => {
    const answers = [...this.state.answers];
    const index = answers.findIndex((ans) => {
      return ans.questionId === questionId;
    });
    console.log(index);
    if (answers.length === 0 || index < 0) {
      return "";
    } else {
      return answers[index].answerText;
    }
  };

  doSubmit = async () => {
    //call the server
    console.log("calling server...");
    const { data } = await axios.put(
      "https://run.mocky.io/v3/0c12d192-aaff-4622-91e5-031f977be9dc",
      this.answers
    );
    console.log(data);
  };

  render() {
    return (
      <div className="container main_exam">
        <h1>exam title: {this.state.exam.examName}</h1>
        <p class="timer">timer is disabled 00:00:00</p>
        <h2>
          class name:
          <br />
          {this.state.exam.className}
        </h2>
        <br />
        <br />
        <ExamTabs
          handelAnswersChange={this.handelChange}
          doSubmit={this.doSubmit}
          examId={this.state.examId}
          questions={this.state.questions}
          answers={this.state.answers}
          getValue={this.showValue}
        />
      </div>
    );
  }
}

export default TakeExam;
