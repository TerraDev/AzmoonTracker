import axios from "axios";

export default async function checkforToken(){
  
}

export default async function storeToken(Info){
localStorage.setItem('AzmoonTracker_jwt', JSON.stringify({
    token: Info.token,
    loggedIn: true
    //username: Info.username
    }))
}