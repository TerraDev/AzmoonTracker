import {useState, useEffect} from 'react'
import GetExam from '../../adapters/Exam/GetExam'
import TakeExam from './TakeExam'

export default function PRE_TakeExam(props)
{
    const [exam, setExam] = useState(null)
    const [answers, setAnswers] = useState(null)

    useEffect(() => { 
        async function GetExamData(examId)
        {
            console.log(3)
            const response = await GetExam(examId)
            //const data = await response.json()
            console.log(response.data)
            setExam( response.data )
            //setLoading(false)
            //const ex = response.data
            const ans = []
            let len = response.data.questions.length;
            console.log("length is " + len)

            for(let i=0; i<len; i++)
            {
                ans.push({
                    "questionId": i+1,
                    "answerText": ""
                })
            }
            await setAnswers(ans)
        }
        GetExamData(props.match.params.ExamId)
    },[])

    return exam && answers ? <TakeExam exam={exam} ans={answers}/> : <div>Loading...</div>
}