import ExamCreation from './ExamCreation'
import {useState, useEffect} from 'react'
import GetExam from '../../adapters/Exam/GetExam'
import { getToken } from '../../adapters/User/handleToken'
import { GetUserExamStatus } from '../../adapters/TakeExam/ExamEnrollment'

export default function PRE_ExamCreation(props)
{
    /*useEffect(() => { 
        async function GetExamData(examId)
        {
            console.log("geting exam data")
            const response = await GetExam(examId)
            //const data = await response.json()
            console.log(response.data)
            setExam( response.data )
            //setLoading(false)
            //const ex = response.data
            const q = []
            let qs = response.data.questions;
            const len = q.length
            console.log("length is " + len)

            for(let i=0; i<len; i++)
            {
                q.push({
                    "questionId": q[i].QuestionNum,
                    "questionText": q[i].QuestionDescription
                })
            }
        }
        GetExamData(props.match.params.ExamId)
    },[]) */

    const ExamId = props?.match?.params?.ExamId
    const isLoggedin = getToken()?.token

    const [isCreator,setCreatorFlag ]= useState(false)
    const [exam, setExam] = useState();

    useEffect(()=>{
        async function CheckCreator(){
        if(isLoggedin)
        {
            if(ExamId)
            {
                setCreatorFlag((await GetUserExamStatus(ExamId)).data.userStatus === "Creator");
                console.log("geting exam data")
                setExam((await GetExam(ExamId)).data);
            }
        }}
        CheckCreator();
    },[])

    console.log("in PRE-creation phase")


    //return props.ExamId ? <ExamCreation Exam={await GetExamData(props.ExamId)}/> : <ExamCreation/>
    return  isLoggedin ? (
        ExamId ? (
            exam ? (
                isCreator ? <ExamCreation Exam={exam}/> 
                : <div>Unauthorized!!</div>
            ): <div>Loading...</div>
        ): <ExamCreation/>
    ): <div>Please login to continue</div>
}
