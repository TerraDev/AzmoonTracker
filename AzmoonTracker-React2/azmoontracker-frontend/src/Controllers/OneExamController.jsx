import OneExamView from "../Views/Exams/OneExamView"
import {Component} from 'react'

class OneExamController extends Component {

    constructor(prop)
    {
        super(prop)
        this.state={exam: prop.exam}
    }

    render(){
        const {exam} 
        = this.state
        return (
            <OneExamView exam={exam}/> 
        )
    }
}

export default OneExamController