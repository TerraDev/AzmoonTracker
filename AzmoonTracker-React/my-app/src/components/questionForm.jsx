import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import "./createExam.css";

class QuestionForm extends Form {
  state = {
    data: { question: "" },
    errors: {},
  };

  schema = {
    question: Joi.string().required().label("question"),
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
    this.props.history.replace("/create-exam");
  };

  render() {
    return (
      <div>
        <h1>Qustion</h1>
        <div className="container main_exam">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("question", "question")}
            {this.renderButton("save")}
          </form>
        </div>
      </div>
    );
  }
}

export default QuestionForm;
