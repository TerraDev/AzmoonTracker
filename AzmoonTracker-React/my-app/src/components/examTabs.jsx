import { options } from "joi-browser";
import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ContactUs from "./contactUs";

class ExamTabs extends Component {
  state = { values: this.props.answers };
  onChangeValue(q, event) {
    const value = event.target.value;

    const answer = {
      examId: this.props.examId,
      questionId: q.questionNum,
      answerText: value,
    };

    let v = {};
    const index = values.findIndex((ans) => {
      return ans.questionId === q.questionId;
    });
    console.log(index);
    if (index >= 0) {
      v = values[index];
    }
    this.setState({ value: answer });
    console.log("value", value);

    this.props.handelAnswersChange(answer);
  }

  handleSubmit = () => {
    this.props.doSubmit();
  };

  render() {
    return (
      <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
        <TabList>
          {this.props.questions.map((q, index) => {
            return <Tab key={index}>{index + 1}</Tab>;
          })}
          <Tab key={this.props.questions.length}>Submit</Tab>
        </TabList>
        {this.props.questions.map((q, index) => {
          return (
            <TabPanel key={index}>
              {`${index + 1}. `}
              {q.questionDescription}
              {q.questionTypeId === 2 ? (
                <div>
                  <input
                    type="text"
                    onChange={this.onChangeValue.bind(this, q)}
                    value={this.state.value[q.questionId]}
                  />
                  <br />
                </div>
              ) : q.questionTypeId === 1 ? (
                <div onChange={this.onChangeValue.bind(this, q)}>
                  {/*console.log(q.choices)*/}
                  {q.choices.map((c, index) => {
                    return (
                      <label key={index + 1}>
                        <input
                          type="radio"
                          value={c.choiceDescription}
                          name="questionTypes"
                        />
                        {c.choiceDescription}
                        <br />
                      </label>
                    );
                  })}
                </div>
              ) : null}
            </TabPanel>
          );
        })}
        <TabPanel key={this.props.questions.length}>
          Submit once finished
          <br />
          <button onClick={this.handleSubmit}>submit answers</button>
        </TabPanel>
      </Tabs>
    );
  }
}

export default ExamTabs;
