import ExamCreation from './ExamCreation'
import {useState, useEffect} from 'react'
import GetExam from '../../adapters/Exam/GetExam'

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
    },[])*/
    console.log("in PRE-creation phase")
    async function GetExamData(ExamId){
        console.log("geting exam data")
        return await GetExam(ExamId) 
        //return await GetExam(ExamId)
    }

    //return props.ExamId ? <ExamCreation Exam={await GetExamData(props.ExamId)}/> : <ExamCreation/>
    return props.ExamId ? <ExamCreation Exam={GetExamData(props.ExamId)} /> : <ExamCreation/>
}