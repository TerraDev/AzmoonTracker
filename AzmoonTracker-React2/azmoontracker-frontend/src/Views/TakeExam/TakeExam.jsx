import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form"
import SubmitAllAnswers from '../../adapters/Answers/SubmitAllAnswers';
import '../../styles/TakeExam.css'
import Timer from './Timer';
import Webcam from './Webcam';

export default function TakeExam({exam, ans}) {

    var warn = useRef(1)

    useEffect(()=>{
        window.addEventListener('blur', function (event) {
            alert("Don't cheat! Warning #" + warn.current)
            warn.current++
        });
    },[])
    
    console.log({exam, ans})
    //const [exam,setExam] = useState(props.exam);
    //const [loading,setLoading] = useState(true);
    //const [answers,setAnswers] = useState(null);

    const {register, handleSubmit, /*formState: {errors} ,*/ setValue, getValues} = useForm({
        defaultValues: {Answers:ans}
    });

    //const response = {}

    const onSubmit = (data) =>
    {
        data.ExamName = exam.examName ;
        data.UserName = "";

        console.log(data);
        SubmitAllAnswers(data,exam.examId)
    }

    return (
        <div className="main_exam">
            <h1>exam title: {exam?.examName}</h1>
            <Webcam />
            <Timer endTime={new Date(exam.endTime)} initTime={new Date(exam.startTime)} />
            <h2>class name:
            <br/>
            {exam?.className}
            </h2>
            <br/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="tabs">
                    {/*<div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" className="for_NAV"/>
                        <label htmlFor="tab-1">1</label>
                        
                        <div className="content">
                            1.
                            this is a descriptive question:
                                <br/>
                            <input type="text" style={{width: "95%"}}/>
                            <br/>
                        </div> 
                    </div>
                    
                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" className="for_NAV"/>
                        <label htmlFor="tab-1" >2</label>
                        
                        <div className="content">
                            2.
                            This is a multi-choice question:
                            <br/>
                                <input type="radio" id="tab-1" name="q2" value="abc" defaultChecked/>1- abc <br/>
                                <input type="radio" id="tab-1" name="q2" value="xyz" />2- xyz <br/>
                                <input type="radio" id="tab-1" name="q2" value="klm" />3- klm <br/>
                                <input type="radio" id="tab-1" name="q2" value="eee" />4- eee <br/>
                            <br/>
                        </div> 
                    </div>*/}

                    {
                        exam ?
                        exam?.questions?.map(question => 
                            <div className="tab" key={question.questionNum} >
                                <input type="radio" id={"tab-"+question.questionNum} name="tab-group-1" className="for_NAV"/>
                                <label htmlFor={"tab-"+question.questionNum}> {question.questionNum} </label>

                                <div className="content">
                                    {question.questionDescription}
                                    <br/>
                                    <textarea /*name={`ans[${question.questionNum-1}].answerText`}*/ style={{width: "95%"}} 
                                    {...register(`Answers[${question.questionNum-1}].answerText`)}/>

                                    <input type="number" {...register(`Answers[${question.questionNum-1}].questionId`,
                                    {valueAsNumber:true})} readOnly hidden/>
                                </div> 
                            </div>
                        ):null
                    }
                    
                    <div className="tab">
                        <input type="radio" id="sub" name="tab-group-1" className="for_NAV"/>
                        <label htmlFor="sub">submit</label>
                    
                        <div className="content">
                            submit once finished:
                            <br/>
                            <input type="submit" value="submit answers"/>
                        </div> 
                    </div>
                </div>
            </form>
        </div>
    )
}