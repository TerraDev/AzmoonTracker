import axios from "axios";
import { getToken } from "../User/handleToken";

export default async function SubmitExam(Exam){
  console.log("submitting exam...")
  return await axios.post("https://localhost:44389/api/Exam/Create", Exam, 
  { headers: {"Authorization" : `Bearer ${getToken()?.token}`}}
  );
}