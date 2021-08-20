import axios from "axios";

export default async function SubmitExam(Exam){
  console.log("submitting exam...")
  return await axios.post("https://localhost:44389/api/Exam/Create", Exam);
}