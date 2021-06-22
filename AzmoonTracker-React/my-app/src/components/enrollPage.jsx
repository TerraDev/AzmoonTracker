import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./myExams.css";

class ErollmentPage extends Component {
  state = {
    isEnrolled: false,
    isStarted: false,
    exam: {},
  };
  async componentDidMount() {
    const { data: examsDetails } = await axios.get(
      "https://localhost:44389/api/Exam/Get/" + this.props.match.params.examId
    );
    const et = [examsDetails]
    const examDetails = et.find(
      (obj) => obj.examId === this.props.match.params.examId
    );

    this.setState({ exam: examDetails });
    //    console.log(this.state.examDetails);
  }

  handelEnrolled = () => {
    this.setState({ isEnrolled: true });
  };

  handelStartExam = () => {
    if (!this.state.isStarted) this.setState({ isStarted: true });
  };
  handelUnenrolled = () => {
    this.setState({ isEnrolled: true });
  };
  render() {
    return (
      <div className="container main_exam">
        <div>
          Name: {this.state.exam.examName}
          <br />
          Search Id: {this.state.exam.examSearchId}
          <br />
          Class Name: {this.state.exam.className}
          <br />
          Question Num: {this.state.exam.questionNum}
          <br />
          Start Time: {this.state.exam.startTime}
          <br />
          End Time: {this.state.exam.endTime}
          <br />
        </div>
        {this.state.isEnrolled ? (
          <React.Fragment>
            <Link
              to={`/my-exams/${this.state.exam.examId}/enroll-page/take-exam`}
            >
              <button onClick={this.handelStartExam}>Start</button>
            </Link>
            <button
              style={{ marginLeft: "10px", backgroundColor: "orange" }}
              onClick={this.handelUnenrolled}
            >
              Unenroll
            </button>
          </React.Fragment>
        ) : (
          <button onClick={this.handelEnrolled}>Enroll</button>
        )}
      </div>
    );
  }
}

export default ErollmentPage;
