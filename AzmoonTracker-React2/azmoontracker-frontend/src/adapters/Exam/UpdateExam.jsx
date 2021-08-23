import axios from "axios";
import { getToken } from "../User/handleToken";

export default async function UpdateExam(Exam, eId){
  console.log("submitting exam...")
  return await axios.post("https://localhost:44389/api/Exam/Update/"+eId, Exam, 
  { headers: {"Authorization" : `Bearer ${getToken()?.token}`}}
  );
}