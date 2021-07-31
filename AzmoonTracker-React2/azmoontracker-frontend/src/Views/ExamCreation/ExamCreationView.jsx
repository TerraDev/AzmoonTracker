import React,{Component} from 'react'
import '../../styles/ExamsList.css'
import QuestionCreationView from './QuestionCreationView'

class ExamCreationView extends Component {
    render() {
        //const {
            //exams,
            //ReturnQuestion
        //} = this.props

        return (
            <div className="main_exam">
            <form>
                <div>
                    <label>exam title:</label>
                    <input type="text" placeholder="enter exam title"/>
                </div>
                <br/>
                <div>
                    <label>date:</label>
                    <input type="date"/>
                </div>
                <br/>
                <div>
                    <label>time:</label>
                    <input type="time"/>
                </div>
                <br/>
                <div>
                    <label>class name:</label>
                    <input type="text" placeholder="eg: school year 9 physics,UCLA mechanical engineering,..."/>
                </div>
                <br/>
                <div>
                    <label>exam image:</label>
                    <input type="file"/>
                </div>
                <br/>
    
                <button>submit</button>
            </form>
            <br/>
    
            <div className="add_question"> +</div>
                <QuestionCreationView />
            </div>
        )
    }
}

export default ExamCreationView