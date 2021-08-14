import React,{Component} from 'react'
import GetExams from '../../adapters/Exam/GetExams';
//import OneExamController from '../../Controllers/OneExamController'
import OneExamView from './OneExamView'
import '../../styles/ExamsList.css'

export default class MainExamsView extends Component {
    
    constructor(){
        super()
        const exam={
          "examId": "",
          "examSearchId": "",
          "examName": "",
          "className": "",
          "isPublic": false,
          "isFinished": false,
          "questionNum": 0,
          "startTime": "",
          "endTime": ""
          //"questions": null
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
    
    render() {
        const {
            exams,
        } = this.state

        return (
            <div className="main_exam_cards">
                {
                    exams.map(exam => 
                        <React.Fragment key={exam.examId}>
                        {
                          <OneExamView exam={exam}/>
                        }
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}