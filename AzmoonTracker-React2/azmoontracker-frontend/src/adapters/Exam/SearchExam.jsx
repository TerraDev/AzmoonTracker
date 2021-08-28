import axios from "axios";
import { getToken } from "../User/handleToken";

export default async function SearchExam(searchExam)
{
  console.log(`searching for exam ${searchExam}`)
  return await axios.get("https://localhost:44389/api/Exam/Search?searchString="+searchExam);
}