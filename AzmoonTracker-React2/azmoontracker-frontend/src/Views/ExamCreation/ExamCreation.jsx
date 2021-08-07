import React, {useState} from 'react'
import '../../styles/ExamCreation.css'
import QuestionCreation from './QuestionCreation'
import {useForm} from "react-hook-form"

export default function ExamCreation() {
    
    const {register, handleSubmit, formState: {errors}} = useForm() ;
    
    const blankQuestion = {
        questionTypeId: 1,
        questionNum: 1,
        questionDescription: ""
    }

    const [Questions, setQuestions] = useState([
            //examId: "",
            //examSearchId: "",
            //examName: "",
            //className: "",
            //isPublic: true,
            //isFinished: false,
            //questionNum: 1,
            //startTime: "",
            //endTime: "",
            blankQuestion   //or ...blankQuestion
    ]);
        
    const addQuestion= () => {
        const newBlankQuestion = {...blankQuestion, questionNum:Questions.length+1}

        setQuestions([...Questions, newBlankQuestion])
    }

    const onSubmit = (data) =>
    {
        console.log(Questions);
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
                    <input type="text" {...register("examClass")}
                    placeholder="eg: school year 9 physics,UCLA mechanical engineering,..." />
                </div>
                <br/>
                <div>
                    <label>exam image:</label>
                    <input type="file" name="examImage"/>
                </div>
                <br/>
                <button>submit</button>

                <div className="add_question" onClick={addQuestion}> + </div>
                <div className="ReverseList">
                {
                Questions.map(Question => 
                    //questionTypeId: 1,
                    //questionNum: 1,
                    //questionDescription: ""
                    <div className="exam_question">
                        <div className="collapse_question"> {Question.questionNum} </div>
                        <div className="remove_question">remove</div>
                        <div>
                            <label>question type:</label>
                            <select name="questionType">
                                <option selected={Question.questionTypeId==1}>Descriptive</option>
                                <option selected={Question.questionTypeId==2}>Multi-choice</option>
                                <option selected={Question.questionTypeId==3}>File upload</option>
                            </select>
                        </div>
                        <br/>
                        <div>
                            <label>enter question:</label>
                            <input type="text" placeholder="" name="questionDescription" 
                            value={Question.questionDescription}/>
                        </div>
                    </div>
                )}
                </div>
            </form>
            <br/>

            {//<div className="add_question"> +</div>
            //<QuestionCreation />
            }
        </div>
    )

}