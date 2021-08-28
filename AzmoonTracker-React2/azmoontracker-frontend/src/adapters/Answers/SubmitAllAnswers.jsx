import axios from "axios";
import { getToken } from "../User/handleToken";

export default async function SubmitAllAnswers(Answers, ExamId){
  console.log("submitting answers...")
  
  return await axios.put("https://localhost:44389/api/ExamParticipant/WriteAllAnswers/"+ExamId, Answers, 
  { headers: {"Authorization" : `Bearer ${getToken()?.token}`}}
  );
}