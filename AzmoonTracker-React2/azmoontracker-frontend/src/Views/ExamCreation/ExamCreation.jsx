import React, {useState} from 'react'
import '../../styles/ExamCreation.css'
import QuestionCreation from './QuestionCreation'
import {useForm, useFieldArray, useWatch} from "react-hook-form"
import SubmitExam from "../../adapters/Exam/SubmitExam"

let qNum = 1;
export default function ExamCreation(props) {
    console.log("Now in creation!" + " exam:")
    console.log(props)
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

    //using react-hook-forms
    const {register, control, handleSubmit, formState: {errors}, watch} = useForm({
        defaultValues: {
            examId: props.Exam?.ExamId || "",
            examSearchId: props.Exam?.ExamSearchId || "",
            examName: props.Exam?.ExamName || "",
            className: props.Exam?.ClassName || "",
            isPublic: props.Exam?.IsPublic || true,
            isFinished: props.Exam?.IsFinished || false,
            //QuestionNum: props.Exam?.ExamName || 1,
            StartTime: props.Exam?.StartTime ,
            EndTime: props.Exam?.EndTime ,
            questions: [(props.Exam?.questions || { QuestionTypeId: 1, QuestionNum:1, QuestionDescription: "" })]
        }
    })

    const {fields, append, remove } = useFieldArray({
        control,
        name: 'questions'
    })

    const onSubmit = (data) =>
    {
        data.QuestionNum = data.questions.length;
        data.questions.map((question)=>{
            question.choices = [];
        })
        console.log(data);
        console.log(props.Exam?.ExamId)
        props.Exam?.ExamId ? void(0) : SubmitExam(data)
    }
    
    return (
        <div className="main_exam">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("examId")} readOnly hidden/>
                <input {...register("isFinished")} readOnly hidden/>

                <div>
                    <label>exam title:</label>
                    <input type="text" placeholder="enter exam title" 
                    {...register("examName")} />
                </div>
                {errors.examName && <p>{errors.examName.message}</p>}
                <br/>
                <div>
                    <label>exam search id:</label>
                    <input type="text" placeholder="enter exam title"
                    {...register("examSearchId")} />
                </div>
                <br/>
                <div>
                    <label>start date and time:</label>
                    <input type="datetime-local" {...register("StartTime")}/>
                </div>
                <br/>
                <div>
                    <label>end time:</label>
                    <input type="datetime-local"  {...register("EndTime")}/>
                </div>
                <br/>
                <div>
                    <input type="checkbox"  {...register("isPublic")}/>
                    <span>exam is public</span>
                </div>
                <br/>
                <div>
                    <label>class name:</label>
                    <input type="text" {...register("className")}
                    placeholder="eg: school year 9 physics,UCLA computer science,..." />
                </div>
                <br/>
                <div>
                    <label>exam image:</label>
                    <input type="file" name="examImage"/>
                </div>
                <br/>
                <button>submit</button>

                <div className="add_question" onClick={() => {append({});qNum++;}}> + </div>
                <div className="ReverseList">
                {
                fields.map(({id, QuestionTypeId, QuestionDescription}, index) => 
                    //questionTypeId: 1,
                    //questionNum: 1,
                    //questionDescription: ""
                    <div className="exam_question" /*key={Question.questionNum}*/  key={id} >
                        <div className="collapse_question"> {index} </div>
                        <input type="number" {...register(`questions[${index}].QuestionNum`,{valueAsNumber:true})}
                        defaultValue={qNum} readOnly hidden />
                        <div className="remove_question" onClick={()=>remove(index)}>remove</div>
                        <div>
                            <label>question type:</label>
                            <select name={`questions[${index}].QuestionTypeId`} defaultValue={QuestionTypeId}
                            {...register(`questions[${index}].QuestionTypeId`,{valueAsNumber:true})}>
                                <option value="1">Descriptive</option>
                                <option value="2">Multi-choice</option>
                                <option value="3">File upload</option>
                            </select>
                        </div>
                        <br/>
                        <div>
                            <label>enter question:</label>
                            <input type="text" placeholder="" name={`questions[${index}].QuestionDescription`}
                            {...register(`questions[${index}].QuestionDescription`)} defaultValue={QuestionDescription}/>
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