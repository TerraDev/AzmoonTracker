
import axios from "axios";


//function returnAxiosInstance() {
  //return Axios.create(initializers);
//}

export default async function GetExams(){
  //const axios = returnAxiosInstance();
  console.log("abc")
  return await axios.get("https://localhost:44389/api/Exam/GetAll");
  //return await axios.get("https://run.mocky.io/v3/81b8d84d-47d8-488a-8199-8a2b21f48d6a");
  //return axios.get(url);
}

//export function post(url, requestData){
  //const axios = returnAxiosInstance();
  //return axios.post(url, requestData);
//}

//export default GetExams