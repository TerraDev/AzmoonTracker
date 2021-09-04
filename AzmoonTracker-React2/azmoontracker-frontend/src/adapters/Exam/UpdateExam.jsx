import axios from "axios";
import { getToken } from "../User/handleToken";

export default async function UpdateExam(Exam, ExamId){
  console.log(" **updationg** exam... ")
  return await axios.put("https://localhost:44389/api/Exam/Update/"+ExamId, Exam, 
  { headers: {"Authorization" : `Bearer ${getToken()?.token}`}}
  );
}

