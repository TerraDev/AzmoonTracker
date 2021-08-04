import React,{Component} from 'react'
import EXAM from '../../Assets/EXAM.jpg'
import '../../styles/OneExam.css'
import {Link} from 'react-router-dom'

class OneExamView extends Component {
    render() {
        const 
            {exam}
         = this.props
        return (
                <div className="exam_card">
                    <img src={EXAM} alt="Exam"/>
                    {
                        exam.PostNum
                    }
                    <br/>
                    {
                        exam.Text
                    }
                    <br/>
                    {
                        exam.Likes
                    }
                    <br/>
                    <Link to={"/TakeExam/"+exam.Text}>The link</Link>
                </div>
        )
    }
}

export default OneExamView