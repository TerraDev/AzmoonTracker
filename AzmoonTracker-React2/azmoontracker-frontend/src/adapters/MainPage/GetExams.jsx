
import axios from "axios";


//function returnAxiosInstance() {
  //return Axios.create(initializers);
//}

async function GetExams(url){
  //const axios = returnAxiosInstance();
  console.log("abc")
  return await axios.get("https://run.mocky.io/v3/a028ecda-cf82-41c7-8047-057189112e8b");
  
  //return axios.get(url);
}

//export function post(url, requestData){
  //const axios = returnAxiosInstance();
  //return axios.post(url, requestData);
//}

export default GetExams