import React, { Component } from "react";
import ExamCard from "./examCard";
import axios from "axios";
import "./myExams.css";

class MyExams extends Component {
  state = {
    exams: [],
  };

  async componentDidMount() {
    const { data: exams } = await axios.get(
      "https://localhost:44389/api/Exam/GetAll"
    );
    this.setState({ exams });
    // const promise = axios.get(
    //   "https://run.mocky.io/v3/5a16634d-7a80-4059-8ac0-ca6d488e18a0"
    // );
    // const response = await promise;
    // console.log(response);
    // console.log(promise);
  }
  handleAdd = async () => {
    console.log("Add");
    const obj = {
      examId: "bbb",
      examSearchId: "mathExam",
      examName: "math",
      className: "mathClass",
      isPublic: true,
      isFinished: false,
      questionNum: 5,
      startTime: "2021-05-28T15:24:01.431",
      endTime: "2021-06-28T15:54:01.431",
      questions: null,
    };

    const { data: exam } = await axios.post(
      "https://run.mocky.io/v3/5a16634d-7a80-4059-8ac0-ca6d488e18a0",
      obj
    );
    console.log(exam);

    // const exams = [exam, ...this.state.exams];
    // this.setState({ exams });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container main_exam_cards">
          {this.state.exams.map((exam) => (
            <ExamCard exam={exam} key={exam.examId} />
          ))}
          {/*<button onClick={this.handleAdd}>add exam</button>*/}
        </div>
        <div className="ad"></div>
        <footer>
          <hr />© Behdad Alagha
        </footer>
      </React.Fragment>
    );
  }
}

export default MyExams;
