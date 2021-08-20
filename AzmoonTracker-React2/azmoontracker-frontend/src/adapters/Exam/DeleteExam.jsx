import axios from "axios"

export default async function DeleteExam(ExamId){
    console.log("deleting exam"+ExamId)
    return await axios.delete("https://localhost:44389/api/Exam/Delete/"+ExamId); 
}