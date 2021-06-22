import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input2";
import QuestionForms from "./questionForms";
import axios from "axios";
import { Route, Link } from "react-router-dom";

import "./createExam.css";

class CreateExam extends Component {
  state = {
    data: {
      examTitle: "",
      date: "",
      stime: "",
      etime: "",
      className: "",
      searchId: "",
    },
    questions: [],
    errors: {},
  };

  schema = {
    examTitle: Joi.string().required().label("examTitle"),
    date: Joi.date().raw().required().label("date"),
    stime: Joi.string().required().label("startTime"),
    etime: Joi.string().required().label("endTime"),
    className: Joi.string().required().label("className"),
    searchId: Joi.string().required().label("searchId"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; // can be username or password
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //Call the server
    this.doSubmit();
  };

  doSubmit = async () => {
    //call the server
    const reverseData = this.state.questions.reverse().map((q, i) => {
      return q.choices.reverse();
    });
    console.log("reverse", reverseData);
    console.log("Submitted");
    console.log("calling server...");
    const min = 97;
    const max = 122;
    const size = Math.random() / 30;
    let eId = "";
    for (let i = 0; i < size; i++) {
      const rand = (min + Math.random() * (max - min)) / 32;
      eId = eId + rand + "a";
    }

    console.log(eId);
    let obj = {
      examId: eId,
      examSearchId: "ssearchlll",
      examName: this.state.data.examName,
      isPublic: true,
      isFinished: false,
      questionNum: 2,
      startTime: this.state.data.stime,
      endTime: this.state.data.etime,
      questions: this.state.questions,
    };
    const { data } = await axios.post(
      "https://localhost:44389/api/Exam/Create",
      obj
    );
    console.log(obj);
    console.log("submitted");
    this.props.history.replace("/my-exams");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div className="container main_exam">
          <form onSubmit={this.handleSubmit}>
            <div>
              <Input
                name="examTitle"
                type="text"
                label="exam title: "
                value={data.examTitle}
                placeholder="enter exam title"
                onChange={this.handleChange}
                error={errors.examTitle}
              />
            </div>
            <br />
            <div>
              <Input
                name="date"
                type="date"
                label="date: "
                value={data.date}
                onChange={this.handleChange}
                error={errors.date}
              />
            </div>
            <br />
            <div>
              <Input
                name="stime"
                type="time"
                label="start time: "
                value={data.stime}
                onChange={this.handleChange}
                error={errors.stime}
              />
            </div>
            <br />
            <div>
              <Input
                name="etime"
                type="time"
                label="end time: "
                value={data.etime}
                onChange={this.handleChange}
                error={errors.etime}
              />
            </div>
            <br />
            <div>
              <Input
                name="className"
                type="text"
                label="class name:"
                value={data.className}
                placeholder="eg: school year 9 physics,UCLA mechanical engineering,..."
                onChange={this.handleChange}
                error={errors.className}
              />
            </div>
            <br />
            <div>
              <Input
                name="searchId"
                type="text"
                label="search Id:"
                value={data.searchId}
                onChange={this.handleChange}
                error={errors.searchId}
              />
            </div>
            <br />
            <button disabled={this.validate()}>submit</button>
          </form>
          <QuestionForms
            /*question part */
            questions={this.state.questions}
            addQuestion={this.addQuestionClick}
            removeQuestion={this.removeQuestionClick}
            qBoxChange={this.handleQuestionBoxChange}
            questionSubmit={this.handleQuestionSubmit}
            /*choice part */
            choices={this.state.choices}
            addChoiceForm={this.addChoiceClick}
            removeChoice={this.removeChoiceClick}
            cBoxChange={this.handleChoiceBoxChange}
            choiceSubmit={this.handleChoiceSubmit}
            /*question type dropdown */
            qTypeDropdown={this.handleQustionTypeDropdownChange}
            qselectValue={this.state.questionType}
          />
        </div>

        <div className="ad"></div>
        <footer>
          <hr />© Behdad Alagha
        </footer>
      </React.Fragment>
    );
  }

  /* question handler functions */
  addQuestionClick = (qNum) => {
    const question = {
      questionTypeId: 2,
      questionNum: qNum,
      questionDescription: "",
      choices: [],
    };

    console.log("qNum", qNum);
    let questions = [question, ...this.state.questions];
    console.log(questions);
    if (this.state.questions.length > 0) {
      questions.map((q, i) => {
        q.questionNum = this.state.questions.length - i;
      });
    }
    // //sort des
    // questions.sort((a, b) => a.questionNum - b.questionNum).reverse();
    this.setState({ questions });

    console.log(this.state);
    console.log("addQuestionClicked");
  };

  removeQuestionClick = (i) => {
    let questions = [...this.state.questions];
    // i = questions.length - i - 1; ////////////////////////////////////check
    questions.splice(i, 1);

    questions.map((q, i) => {
      q.questionNum = questions.length - i;
    });
    this.setState({ questions });
    console.log("remove q", this.state.questions);
  };

  handleQuestionBoxChange = (i, value) => {
    const questions = [...this.state.questions];
    //  i = questions.length - i - 1; ////////////////////////////////////check
    questions[i].questionDescription = value;
    console.log(value);
    this.setState({ questions });
  };

  handleQuestionSubmit = (errors) => {
    //const errors = this.validate();
    // this.setState({ errors: errors || {} });
    // if (errors) return;

    console.log("handleQuestionSubimt");
  };

  /* choice handler functions*/
  addChoiceClick = (ql, question, cNum, qIndex) => {
    const choice = { choiceNum: cNum, choiceDescription: "", isCorrect: false };

    const questions = [...this.state.questions];
    //let qNum = questions.length - question.questionNum - 1; ////////////////////////////////////check
    let qNum = question.questionNum;

    const choices = [choice, ...this.state.questions[qIndex].choices];

    questions[qIndex].choices = choices;
    questions.map((q) => {
      q.choices.map((c, i) => {
        c.choiceNum = questions[qIndex].choices.length - i;
      });
    });
    //sort des
    // questions.map((q) => {
    //   q.choices.sort((a, b) => a.choiceNum - b.choiceNum).reverse();
    // });
    this.setState({ questions });
    console.log("add choice", this.state.questions[qIndex]);
  };

  removeChoiceClick = (question, i, qIndex) => {
    const questions = [...this.state.questions];
    //   let qNum = questions.length - question.questionNum - 1; ////////////////////////////////////check
    //  i = questions[qNum].choices.length - i - 1;
    //let qNum = question.questionNum;
    questions[qIndex].choices.splice(i, 1);

    questions.map((q) => {
      q.choices.map((c, i) => {
        c.choiceNum = questions[qIndex].choices.length - i;
      });
    });

    this.setState({ questions });
    console.log("update q", this.state.questions);

    console.log("remove c", questions[qIndex].choices);
  };

  handleChoiceBoxChange = (i, qIndex, ql, qNum, value) => {
    //   qNum = ql - qNum - 1; ////////////////////////////////////check
    console.log("c", qIndex);
    let choices = [...this.state.questions[qIndex].choices];
    const questions = [...this.state.questions];
    //  i = choices.length - i - 1; ////////////////////////////////////check

    choices[i].choiceDescription = value;
    questions[qIndex].choices = choices;

    this.setState({ questions });
    console.log("val", value);
    console.log("c", choices);
    console.log("q", this.state.questions);
  };

  handleChoiceSubmit = (errors) => {
    //const errors = this.validate();
    // this.setState({ errors: errors || {} });
    // if (errors) return;

    console.log("handleQuestionSubimt");
  };

  //for dropdown
  handleQustionTypeDropdownChange = (value, qNum, index) => {
    const questions = [...this.state.questions];
    let id = 0;
    if (value === "Descriptive") id = 2;
    else id = 1;
    //  qNum = questions.length - qNum - 1; ////////////////////////////////////check
    questions[index].questionTypeId = id;
    this.setState({ questions });
    //console.log(questions[questions.length - qNum].questionTypeId);
  };
}

export default CreateExam;
