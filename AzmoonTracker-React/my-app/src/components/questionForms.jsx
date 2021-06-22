import React, { Component } from "react";
import QuestionForm from "./createQuestionForm";
import "./createExam.css";

class QuestionForms extends Component {
  state = { questions: this.props.questions };
  render() {
    return (
      <React.Fragment>
        <div
          onClick={(e) => this.props.addQuestion(this.props.questions.length)}
          className="add_question"
        >
          +
        </div>
        <QuestionForm
          /*question part */
          questions={this.props.questions}
          addQuestion={this.props.addQuestion}
          removeQuestion={this.props.removeQuestion}
          qBoxChange={this.props.qBoxChange}
          questionSubmit={this.props.questionSubmit}
          /*choice part */
          choices={this.props.choices}
          addChoice={this.props.addChoiceForm}
          removeChoice={this.props.removeChoice}
          cBoxChange={this.props.cBoxChange}
          choiceSubmit={this.props.choiceSubmit}
          /*question type dropdown */
          qTypeDropdown={this.props.qTypeDropdown}
          qselectValue={this.props.qselectValue}
        />
      </React.Fragment>
    );
  }
}

export default QuestionForms;
