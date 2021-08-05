import axios from "axios"

export default async function GetExam(ExamId){
    console.log("abc")
    return await axios.get("https://run.mocky.io/v3/020ad072-20e4-4133-8e85-48f31a689428"/*,ExamId*/); 
}

