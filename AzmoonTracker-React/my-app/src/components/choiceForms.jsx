import React, { Component } from "react";
import ChoiceForm from "./createChoiceForm";
import "./createExam.css";

class ChoiceForms extends Component {
  state = { choices: this.props.choices };
  render() {
    return (
      <React.Fragment>
        <div
          onClick={(e) =>
            this.props.addChoice(
              this.props.questionsLen,
              this.props.question,
              this.props.choices.length,
              this.props.qIndex
            )
          }
          className="add_choice"
        >
          add
        </div>
        <ChoiceForm
          /*choice part */
          qIndex={this.props.qIndex}
          choices={this.props.choices}
          question={this.props.question}
          questionLen={this.props.questionsLen}
          removeChoice={this.props.removeChoice}
          cBoxChange={this.props.cBoxChange}
          choiceSubmit={this.props.choiceSubmit}
        />
      </React.Fragment>
    );
  }
}

export default ChoiceForms;
