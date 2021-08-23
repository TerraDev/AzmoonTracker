import axios from "axios";
import { getToken } from "../User/handleToken";

export default async function GetParticipants(ExamId)
{
  console.log("Getting Answers of students for exam " + ExamId)
  return await axios.get(`https://localhost:44389/api/Exam/GetParticipants/${ExamId}`,
  { headers: {"Authorization" : `Bearer ${getToken()?.token}`}});
}