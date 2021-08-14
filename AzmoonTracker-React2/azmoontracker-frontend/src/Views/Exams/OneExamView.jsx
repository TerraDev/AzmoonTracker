import React,{Component} from 'react'
import EXAM from '../../Assets/EXAM.jpg'
import '../../styles/OneExam.css'
import {Link} from 'react-router-dom'

export default class OneExamView extends Component {

    constructor(prop)
    {
        super(prop)
        this.state={exam: prop.exam}
    }

    render() {
        const {exam}= this.state
        return (
                <div className="exam_card">
                    <img src={EXAM} alt="Exam"/>
                    <label>Search Id: </label>
                    {
                        exam.examSearchId
                    }
                    <br/>
                    <label>Exam name: </label>
                    {
                        exam.examName
                    }
                    <br/>
                    <label>Class name: </label>
                    {
                        exam.className
                    }
                    <br/>
                    <label>Start time: </label>
                    {
                        exam.startTime
                    }
                    <br/>
                    <label>End time: </label>
                    {
                        exam.endTime
                    }
                    <br/>
                    <Link to={"/TakeExam/"+exam.examId}>The link</Link>
                </div>
        )
    }
}