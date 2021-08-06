import React, {useState} from 'react'
import '../../styles/ExamCreation.css'
import QuestionCreation from './QuestionCreation'
import {useForm} from "react-hook-form"

export default function ExamCreation() {
    
    const {register, handleSubmit, formState: {errors}} = useForm() ;
    
    const [Exam, setExam] = useState({
            examId: "",
            examSearchId: "",
            examName: "",
            className: "",
            isPublic: true,
            isFinished: false,
            questionNum: 1,
            startTime: "",
            endTime: "",
            questions: [
              {
                questionTypeId: 1,
                questionNum: 1,
                questionDescription: ""
              }
            ]
        });
        
    const onSubmit = (data) =>
    {
        console.log(data);
    }

    return (
        <div className="main_exam">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>exam title:</label>
                    <input type="text" placeholder="enter exam title" name="examTitle"
                    {...register("examTitle")}/>
                </div>
                {errors.examTitle && <p>{errors.examTitle.message}</p>}
                <br/>
                <div>
                    <label>date:</label>
                    <input type="date" name="examDate" {...register("examDate")}/>
                </div>
                <br/>
                <div>
                    <label>time:</label>
                    <input type="time" name="examTime" {...register("examTime")}/>
                </div>
                <br/>
                <div>
                    <label>class name:</label>
                    <input type="text" {...register("examClass", {required: true})}
                    placeholder="eg: school year 9 physics,UCLA mechanical engineering,..." />
                </div>
                <br/>
                <div>
                    <label>exam image:</label>
                    <input type="file" name="examImage"/>
                </div>
                <br/>
                <button>submit</button>

                <div className="add_question"> + </div>
                {
                Exam.questions.map(question => 
                //questionTypeId: 1,
                //questionNum: 1,
                //questionDescription: ""
                <div className="exam_question">
                    <div className="collapse_question"> {question.questionNum} </div>
                    <div className="remove_question">remove</div>
                    <div>
                        <label>question type:</label>
                        <select name="questionType">
                            <option selected={question.questionTypeId==1}>Descriptive</option>
                            <option selected={question.questionTypeId==2}>Multi-choice</option>
                            <option selected={question.questionTypeId==3}>File upload</option>
                        </select>
                    </div>
                    <br/>
                    <div>
                        <label>enter question:</label>
                        <input type="text" placeholder="" name="questionDescription" 
                        value={question.questionDescription}/>
                    </div>
                </div>
                )}
            </form>
            <br/>

            {//<div className="add_question"> +</div>
            //<QuestionCreation />
            }
        </div>
    )

}