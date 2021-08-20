import axios from "axios";

export default async function LoginUser(userData){
  console.log("abc")
  return await axios.post("https://localhost:44389/api/Auth/login", 
      userData
  );
}

