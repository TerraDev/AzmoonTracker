import axios from "axios";
import { getToken } from "../User/handleToken";


export async function EnrollinExam(examId){
  console.log("Enrolling in exam " + examId)
  return await axios.post("https://localhost:44389/api/ExamParticipant/EnrollExam/" + examId
  , { headers: {"Authorization" : `bearer ${getToken()?.token}`}})
}

export async function UnenrollfromExam(examId){
    console.log("Unenrolling from exam " + examId)
    return await axios.delete("https://localhost:44389/api/ExamParticipant/UnenrollExam/" + examId
    , { headers: {"Authorization" : `bearer ${getToken()?.token}`}})
}

export async function GetUserExamStatus(examId){
    console.log("getting enrollment status from exam " + examId)
    console.log(getToken().token)
    return await axios.get("https://localhost:44389/api/ExamParticipant/GetUserExamStatus/" + examId
    , { headers: {"Authorization" : `bearer ${getToken()?.token}`}})
}

export function GetParticipantsinExam(examId)
{

}

export function GetParticipantAnswers(examId)
{

}

export function writeAnswers(examId)
{

}