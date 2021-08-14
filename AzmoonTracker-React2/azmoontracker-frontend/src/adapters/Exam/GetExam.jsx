import axios from "axios"

export default async function GetExam(ExamId){
    console.log("abc")
    return await axios.get("https://localhost:44389/api/Exam/Get/"+ExamId); 
}