import React,{Component} from 'react'
import EXAM from '../../Assets/EXAM.jpg'
import '../../styles/OneExam.css'

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
                    <br></br>
                    {
                        exam.Text
                    }
                    <br></br>
                    {
                        exam.Likes
                    }
                </div>
        )
    }
}

export default OneExamView