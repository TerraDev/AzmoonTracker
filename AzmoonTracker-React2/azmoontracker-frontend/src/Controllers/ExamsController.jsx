import React,{ Component } from 'react';
import GetExams from '../adapters/Exam/GetExams';
import MainExamsView from '../Views/Exams/MainExamsView'
import OneExamController from './OneExamController'

class ExamsController extends Component {

  constructor(){
    super()
    const exam={
    "PostNum": 0,
    "Text": "",
    "Likes": 0
    }

    this.state={
    exams:[exam]
    }
  }

  //async?
  async componentDidMount()
  {
    const response = await GetExams();
    this.setState({
      exams: response.data,
    })
    console.log(response.data);
    //console.log(this.state);
  }

  ReturnOneExam = (exam) =>
  {
    return <OneExamController exam={exam}/>;
  }

  render(){
    const {exams} = this.state
    return (
        <MainExamsView exams={exams} ReturnExam={this.ReturnOneExam} />
    )
  }
}

export default ExamsController;