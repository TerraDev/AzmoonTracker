import React, { Component } from "react";
import Question from "./question/Question";
import Answer from "./answer/Answer";
import "./QuizMain.css";

class Quiz extends Component {
  state = {
    questions: {
      1: "what is your name?",
      2: "what do you do?",
      3: "How old are you?",
    },
    answers: {
      1: {
        1: "Mina",
        2: "Nime",
        3: "Non of them",
      },
      2: {
        1: "engineer",
        2: "student",
        3: "both of them",
      },
      3: {
        1: "22",
        2: "O.o",
        3: ":)",
      },
    },
    correctAnswers: {
      1: "1",
      2: "3",
      3: "2",
    },
    correctAnswer: 0,
    clickedAnswer: 0,
    step: 1,
    score: 0,
  };
  checkAnswer = (answer) => {
    const { correctAnswers, step, score } = this.state;
    if (answer === correctAnswers[step]) {
      this.setState({
        score: score + 1,
        correctAnswer: correctAnswers[step],
        clickedAnswer: answer,
      });
      console.log("done?!");
    } else {
      this.setState({ correctAnswer: 0, clickedAnswer: answer });
    }
  };

  nextStep = (step) => {
    this.setState({ step: step + 1, correctAnswer: 0, clickedAnswer: 0 });
  };
  render() {
    let { questions, answers, correctAnswer, clickedAnswer, step, score } =
      this.state;
    return (
      <div className="Content">
        {step <= Object.keys(questions).length ? (
          <>
            <Question question={this.state.questions[this.state.step]} />
            <Answer
              answer={this.state.answers[step]}
              setp={this.state.step}
              checkAnswer={this.checkAnswer}
              correctAnswer={correctAnswer}
              clickedAnswer={clickedAnswer}
            />
            <button
              className="NextStep"
              disabled={
                clickedAnswer && Object.keys(questions).length >= step
                  ? false
                  : true
              }
              onClick={() => this.nextStep(step)}
            >
              Next
            </button>
          </>
        ) : (
          <div className="finalPage">
            <h1>You have completed the quiz!</h1>
            <p>
              Your score is: {score} of {Object.keys(questions).length}
            </p>
            <p>Thank you!</p>
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;
