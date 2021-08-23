import axios from "axios";
import { getToken } from "../User/handleToken";


export async function EnrollinExam(examId){
  console.log("Enrolling in exam " + examId)
  return await axios.post("https://localhost:44389/api/ExamParticipant/EnrollExam/" + examId, null
  , { headers: {"Authorization" : `Bearer ${getToken()?.token}`}})
}

export async function UnenrollfromExam(examId){
  console.log("Unenrolling from exam " + examId)
  return await axios.delete("https://localhost:44389/api/ExamParticipant/UnenrollExam/" + examId
  , { headers: {"Authorization" : `Bearer ${getToken()?.token}`}})
}

export async function GetUserExamStatus(examId){
  console.log("getting enrollment status from exam " + examId)
  console.log(getToken().token)
  return await axios.get("https://localhost:44389/api/ExamParticipant/GetUserExamStatus/" + examId
  , { headers: {"Authorization" : `Bearer ${getToken()?.token}`}})
}