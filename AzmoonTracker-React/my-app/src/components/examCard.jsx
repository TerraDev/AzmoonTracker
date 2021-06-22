import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./createExam.css";

class ExamCard extends Component {
  state = {};

  render() {
    // const { exam } = this.props.exam;
    return (
      <React.Fragment>
        {
          <Link
            to={`/my-exams/${this.props.exam.examId}/enroll-page`}
            className="exam_card"
          >
            <img src="./EXAM.jpg" alt="Exam" />
            Name: {this.props.exam.examName}
            <br />
            Search Id: {this.props.exam.examSearchId}
            <br />
            Class Name: {this.props.exam.className}
            <br />
            Question Num: {this.props.exam.questionNum}
            <br />
            Start Time: {this.props.exam.startTime}
            <br />
            End Time: {this.props.exam.endTime}
            <br />
          </Link>
        }
      </React.Fragment>
    );
  }
}

export default ExamCard;
