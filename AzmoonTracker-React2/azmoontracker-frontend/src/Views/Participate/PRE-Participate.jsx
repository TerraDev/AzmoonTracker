import { useEffect, useRef, useState } from "react"
import { getToken } from "../../adapters/User/handleToken"
import Participate from "./Participate"
import GetExam from "../../adapters/Exam/GetExam"
import { Link } from "react-router-dom"
import { GetUserExamStatus, UnenrollfromExam, EnrollinExam} from "../../adapters/TakeExam/ExamEnrollment"
import DeleteExam from "../../adapters/Exam/DeleteExam"
import PRE_TakeExam from "../TakeExam/PRE-TakeExam"

export default function PRE_Participate(props)
{    
        //check for token in just frontend
        //if doesn't exist, -> 1: show buttons but make them so they redirect to login page
        //if exists, check whether the user is:
            // 2: The creator (API call from previous) -> depends on the time
            // 3: participated in the exam -> depends on the time
            // 4: not participated in exam -> depends on the time
    //pass html as props Corresponding buttons

    const [htmlButtons,setHtmlButtons] = useState(null)
    const [examDetails,setExamDetails] = useState(null)
    const [toExam,SettoExam] = useState(false)

    useEffect(()=>{
        async function GetExamDetails(){
            console.log("inside useEffect1")
            console.log(props.match.params.ExamId)

            //get the exam
            const exam = (await GetExam(props.match.params.ExamId)).data
            setExamDetails(exam)
            console.log(exam)
        }
        GetExamDetails()
    },[])


    //process exam.date... and get final date
    useEffect(()=>{
        async function ParticipateAuthTable(){

            const examId = props.match.params.ExamId;

            console.log("inside useEffect2")
            console.log(examDetails.startTime)
            console.log(new Date())
            console.log(examDetails.endTime)

            //check date
            let before = false
            let current = false
            let after = false
            let now = new Date()

            if(now >= new Date(examDetails.endTime))
                after = true;
            else if(new Date(examDetails.startTime) < now && now < new Date(examDetails.endTime))
                current = true; 
            else
                before=true;

            console.log({before: before, current: current, after: after})

            //get token
            const token = getToken()

            //token doesn't exist
            if(token==null)
            {
                if(after)
                    setHtmlButtons(<>exam was finished...<br/>
                     if you participated in the exam, <Link to='/Login'>login</Link> to view your answers</>)
                else
                    setHtmlButtons(<><Link to='/Login'>login</Link> to enroll in exam</>)
            }
            else //token exists
            {
                //create an enum and set it as current user state in an exam
                let userStatus = (await GetUserExamStatus(examId)).data.userStatus;
                console.log(userStatus);
                
                if( userStatus == "Creator")
                {
                    if(before)
                    {
                        setHtmlButtons(<><button onClick={()=>{props.history.push("/CreateExam/"+examId)}}>Edit exam</button>
                        <button className="warn" onClick={()=>{DeleteExam(examId);props.history.push("/")}}>Delete exam</button>
                        <button onClick={()=>{props.history.push("/Answers/"+examId)}}>Participants</button></>)
                    }
                    else if(current)
                    {
                        setHtmlButtons(<><button onClick={()=>{props.history.push("/Proctor/"+examId)}}>Proctor exam</button>
                        <button onClick={()=>{props.history.push("/Answers/"+examId)}}>Participants</button></>)
                    }
                    else //after
                    {
                        setHtmlButtons(<>exam was finished... 
                        <button onClick={()=>{props.history.push("/Answers/"+examId)}}>view answers</button></>)
                    }
                }
                else if (userStatus == "Enrolled")
                {
                    if(before)
                    {
                        setHtmlButtons(<><button disabled={true}>start exam</button>
                        <button className="warn" onClick={()=>{UnenrollfromExam(examId);window.location.reload()}}>unenroll</button></>)
                    }
                    else if(current)
                    {
                        setHtmlButtons(<><button onClick={()=>{SettoExam(true)}}>start exam</button></>)
                    }
                    else
                    {
                        setHtmlButtons(<>exam was finished... 
                        <button onClick={() => {props.history.push(
                            `/Answers/${props.match.params.ExamId}/${getToken()?.token?.username}`)}}>view answers</button></>)
                    }
                }
                else //not enrolled
                {
                    if(after)
                        setHtmlButtons(<>exam was finished...</>)
                    else
                        setHtmlButtons(<><button onClick={()=>{EnrollinExam(examId);window.location.reload() }}>enroll</button></>)
                }
            }
        }

        if(examDetails!=null)
            ParticipateAuthTable();

    },[examDetails])

    return !toExam ?
    (htmlButtons && examDetails ? <Participate Buttons={htmlButtons} Exam={examDetails} /> : <div>Loading...</div>)
    :<PRE_TakeExam examId={props.match.params.ExamId} ></PRE_TakeExam> 
}