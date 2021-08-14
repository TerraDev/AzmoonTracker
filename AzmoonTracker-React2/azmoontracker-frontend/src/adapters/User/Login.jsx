import axios from "axios";

export default async function RegisterUser(userData){
  console.log("abc")
  return await axios.get("https://localhost:44389/login", {
      params:userData
  });
}

