import React,{Component} from 'react'
import '../../styles/ExamsList.css'

class MainExamsView extends Component {
    render() {
        const {
            exams,
            ReturnExam
        } = this.props

        return (
            <div className="main_exam_cards">
                {
                    exams.map(exam => 
                        <React.Fragment key={exam.PostNum}>
                        {ReturnExam(exam)}
                        </React.Fragment> 
                    )
                }
            </div>
        )
    }
}

export default MainExamsView