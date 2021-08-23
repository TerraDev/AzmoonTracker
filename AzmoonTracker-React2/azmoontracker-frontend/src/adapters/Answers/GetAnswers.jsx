import axios from "axios";
import { getToken } from "../User/handleToken";

export default async function GetAnswers(ExamId, ParticipantId)
{
  console.log("Getting Answers of student " + ParticipantId + " for exam " + ExamId)
  return await axios.get(`https://localhost:44389/api/Exam/GetExamAnswer/${ExamId}/${ParticipantId}`,
  { headers: {"Authorization" : `Bearer ${getToken()?.token}`}});
}