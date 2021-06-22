import React, { Component } from "react";
import axios from "axios";

class ExamDetails extends Component {
  state = { examDetails: {} };

  async componentDidMount() {
    const { data: examsDetails } = await axios.get(
      "https://run.mocky.io/v3/1efb72d8-0bcc-4b1c-af64-94d2170516e4"
    );
    const examDetails = examsDetails.find(
      (obj) => obj.examId === this.props.match.params.examId
    );

    this.setState({ examDetails });
    //    console.log(this.state.examDetails);
  }

  render() {
    return (
      <div>
        <h1>exam details - {this.props.match.params.examId}</h1>
      </div>
    );
  }
}

export default ExamDetails;
