import React,{Component} from 'react'
import GetExams from '../../adapters/Exam/GetExams';
//import OneExamController from '../../Controllers/OneExamController'
import OneExamView from './OneExamView'
import '../../styles/ExamsList.css'
import SearchExam from '../../adapters/Exam/SearchExam';
import SearchExamView from './SearchExamView';

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

        this.SearchforExam = this.SearchforExam.bind(this);
      }
    
      async componentDidMount()
      {
        const response = await GetExams();
        this.setState({
          exams: response.data,
        })

        console.log(response.data);
        //console.log(this.state);
      }

      async SearchforExam(searchString)
      {
        console.log("search string: " + searchString)
        const res =
        searchString ? (await SearchExam(searchString)).data : 
        (await GetExams()).data ;
        this.setState({exams: res})
      }
    
    render() {
        const {
            exams,
        } = this.state

        return (
          <>
            <SearchExamView SearchFunc={this.SearchforExam}/>
            <div className="main_exam_cards">
                { exams.length>0 ?
                    exams.map(exam => 
                        <React.Fragment key={exam.examId}>
                        {
                          <OneExamView exam={exam}/>
                        }
                        </React.Fragment>
                    ) : "No search results"
                }
            </div>
          </>
        )
    }
}