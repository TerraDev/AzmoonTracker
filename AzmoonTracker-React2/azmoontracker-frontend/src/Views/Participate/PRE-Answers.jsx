import { useEffect, useState } from "react"
import { getToken } from "../../adapters/User/handleToken"
import { GetUserExamStatus } from "../../adapters/TakeExam/ExamEnrollment"
import GetParticipants from "../../adapters/Answers/GetParticipants"
import Participants from "./Participants"
import Answers from "./Answers"
import GetAnswers from "../../adapters/Answers/GetAnswers"
import GetExam from "../../adapters/Exam/GetExam"

export default function PRE_Answers(props)
{
    const [isAuthorized,setAuthorize] = useState()
    //const [isLoading, setLoading] = useState(true)
    const [exam,setExam] = useState()
    const [answers, setAnswers] = useState()
    const [participants, setParticipants] = useState();

    console.log("rendering pre-answers")
    console.log({participants: participants})
    console.log({exam: exam})
    console.log({answers: answers})

    useEffect(() => {
        async function Authorize(examId){
            var auth=false;
            if(getToken()?.token)
                if((await GetUserExamStatus(examId))?.data?.userStatus == "Creator")
                    auth=true
                else
                    auth=false
            else
                auth=false
            setAuthorize(auth)
            return auth
        }

        async function assignStudents(examId){
            setParticipants((await GetParticipants(examId)).data)
        }

        async function getExamAnswers(examId,StudentId){
            setAnswers((await GetAnswers(examId,StudentId)).data)
            setExam((await GetExam(examId)).data)
        }
        const prop = props.match.params;
        const auth2 = Authorize(prop.ExamId)
        if(auth2)
        {
            if(prop.StudentId)
            {
                setParticipants(null)
                getExamAnswers(prop.ExamId,prop.StudentId)
            }
            else
            {
                assignStudents(prop.ExamId)
            }
        }
        console.log("just finished useEffect")
    },[props.match.params.StudentId])

    const dataReady = participants || (answers && exam)

    return  !(isAuthorized===undefined) ? 
    (isAuthorized===true ? 
        (dataReady ? 
            (participants ? <Participants participants={participants} examId={props.match.params.ExamId}/> 
                : <Answers answers={answers} exam={exam}/>
            ): <div>loading...</div>  
        ) : <div>Unauthorized</div>
    ) : <div>loading...</div>
}