
import axios from "axios";

export default async function RegisterUser(UserData){
  console.log("abc")
  return await axios.post("https://localhost:44389/api/Auth/Register",UserData)
}
