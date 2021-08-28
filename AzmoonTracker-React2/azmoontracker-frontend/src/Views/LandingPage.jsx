import "../styles/LandingPage.css";
import AzmoonTrackerLogo from "../Assets/AzmoonTrackerLogo.png"
import { useEffect, useState } from "react";
import MainExamsView from "./Exams/MainExamsView"
import { checkforToken } from "../adapters/User/handleToken";

export default function Landing() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        setIsLoggedIn(checkforToken())
    },[])

    return ( isLoggedIn ? <MainExamsView /> :
      <>
        <div className="container">
          <a className="toExams" onClick={()=>{setIsLoggedIn(true)}}>
            <img
              id="SiteLogo"
              src={AzmoonTrackerLogo}
              alt="AzmoonTrackerLogo"/>
          </a>
          <h1 id="SiteTitle">
            <a className="toExams" onClick={()=>{setIsLoggedIn(true)}}>
              Azmoon Tracker
            </a>
          </h1>
        </div>
      </>
    );
}
