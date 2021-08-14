import React, {useState} from 'react'
import '../../styles/ExamCreation.css'
import QuestionCreation from './QuestionCreation'
import {useForm} from "react-hook-form"

export default function ExamCreation() {
    
    const {register, handleSubmit, formState: {errors}} = useForm() ;
    
    const [ExamDesc,setExamDesc] = useState({
        examId: "",
        examSearchId: "",
        examName: "",
        className: "",
        isPublic: true,
        isFinished: false,
        questionNum: 1,
        startDate: "",
        startTime: "",
        endTime: "",
    })

    const handleExamDescChanges = (e) => setExamDesc({
        ...ExamDesc,
        [e.target.name]: [e.target.value]
    })

    const blankQuestion = {
        questionTypeId: 1,
        questionNum: 1,
        questionDescription: ""
    }

    const [Questions, setQuestions] = useState([
            blankQuestion
    ]);

    //one possible solution is to send the object itself along with e
    const handleQuestionChanges = (Qindex,e) => {
        const toBeQuestions = [...Questions];
        //console.log(e.target)
        //console.log(Qindex)
        //console.log(e.target.name)
        if(e.target.name=="questionTypeId")
            toBeQuestions[Qindex][e.target.name] = +e.target.value
        else
            toBeQuestions[Qindex][e.target.name] = e.target.value
        setQuestions(toBeQuestions)
        console.log(Questions)
    }

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
                    {...register("examTitle")} value={ExamDesc.examName} onChange={handleExamDescChanges}/>
                </div>
                {errors.examTitle && <p>{errors.examTitle.message}</p>}
                <br/>
                <div>
                    <label>date:</label>
                    <input type="date" name="examDate" {...register("examDate")}
                    value={ExamDesc.startDate} onChange={handleExamDescChanges}/>
                </div>
                <br/>
                <div>
                    <label>time:</label>
                    <input type="time" name="examTime" {...register("examTime")}
                    value={ExamDesc.startTime} onChange={handleExamDescChanges}/>
                </div>
                <br/>
                <div>
                    <label>class name:</label>
                    <input type="text" {...register("examClass")}
                    placeholder="eg: school year 9 physics,UCLA mechanical engineering,..." 
                    value={ExamDesc.className} onChange={handleExamDescChanges}/>
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
                    <div className="exam_question" key={Question.questionNum}>
                        <div className="collapse_question"> {Question.questionNum} </div>
                        <div className="remove_question">remove</div>
                        <div>
                            <label>question type:</label>
                            <select name={"questionTypeId"} value={Question.questionTypeId} 
                            onChange={(e) => handleQuestionChanges(Question.questionNum-1,e)}>
                                <option value={1}>Descriptive</option>
                                <option value={2}>Multi-choice</option>
                                <option value={3}>File upload</option>
                            </select>
                        </div>
                        <br/>
                        <div>
                            <label>enter question:</label>
                            <input type="text" placeholder="" name="questionDescription" 
                            value={Question.questionDescription} 
                            onChange={(e) => handleQuestionChanges(Question.questionNum-1,e)}/>
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