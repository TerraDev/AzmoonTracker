import React from 'react'
import '../../styles/QuestionCreation.css'

export default function QuestionCreation() {
    return (
    <div className="exam_question">
        <div className="collapse_question"> 1 </div>
        <div className="remove_question">remove</div>
        <div>
            <label>question type:</label>
            <select>
                <option>Descriptive</option>
                <option>Multi-choice</option>
                <option>File upload</option>
            </select>
        </div>
            <br></br>
        <div>
            <label>enter question:</label>
            <input type="text" placeholder=""></input>
        </div>
    </div>
    )
}