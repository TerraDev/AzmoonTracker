import axios from "axios";
import { reRenderNavbar } from "../../Views/TopNav";

//change name to getTokenfromStorage and return entire token or null
export function checkforToken(){
  var jwt = localStorage.getItem('AzmoonTracker_jwt')
  return jwt ? "Mike" : null
}

export function getToken()
{
  var jwt = localStorage.getItem('AzmoonTracker_jwt')
  return (JSON.parse(jwt) || null)
}

export function storeToken(Info){
localStorage.setItem('AzmoonTracker_jwt', JSON.stringify({
    token: Info.token,
    loggedIn: true
    //username: Info.username
    }))
}