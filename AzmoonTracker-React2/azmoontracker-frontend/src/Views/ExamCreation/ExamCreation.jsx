import React from 'react'
import '../../styles/ExamCreation.css'
import QuestionCreation from './QuestionCreation'
import {useForm} from "react-hook-form"

export default function ExamCreation() {
    
    const {register, handleSubmit, formState: {errors}} = useForm() ;

    const onSubmit = (data) =>
    {
        console.log(data);
    }

    return (
        <div className="main_exam">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>exam title:</label>
                <input type="text" id="examTitle" placeholder="enter exam title" name="examTitle"
                 {...register("examTitle", {required: {value:true, message:"PASSWORD is required."}, 
                 minLength: {value:8, message:"PASSWORD is too short."}})}/>
            </div>
            {errors.examTitle && <p>{errors.examTitle.message}</p>}
            <br/>
            <div>
                <label>date:</label>
                <input type="date" name="examDate" {...register("examDate", {required: true})}/>
            </div>
            <br/>
            <div>
                <label>time:</label>
                <input type="time" name="examTime" {...register("examTime", {required: true})}/>
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
        </form>
        <br/>

        <div className="add_question"> +</div>
            <QuestionCreation />
        </div>
    )

}