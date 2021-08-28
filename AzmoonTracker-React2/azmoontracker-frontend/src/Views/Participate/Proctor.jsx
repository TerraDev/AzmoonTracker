import { useEffect, useState } from "react"
import "../../styles/Proctor.css"
import GetParticipats from "../../adapters/Answers/GetParticipants"
import StudentImage from '../../Assets/webcamIMG.jpg'
import camStream from "../../adapters/camStream/camStream"

export default function Proctor(props){

    const [participants,setParticipants] = useState(null) 
    //console.log(participants)

    useEffect(()=>{
        const getParts = async ()=> {
            return setParticipants(((await GetParticipats(props.match.params.ExamId)).data));
        }
        getParts();
    },[])
    return(
        <div className="main_cheatCam">
            <div className="Student_camera">
                <img className="Cam_image" src={StudentImage}/>
                <div className="Student_name">Reza</div>
            </div>
            <div className="Student_camera">
                <img className="Cam_image" src={StudentImage}/>
                <div className="Student_name">Ali</div>
            </div>
            { participants?.map(({username,userId},)=>
                <div key={userId} className="Student_camera">
                    <video className="Cam_image" autoPlay mute id={"vid"+userId}/>
                    <camStream groupName={props.match.params.ExamId} remoteVideo={document.getElementById("vid"+userId)}/>
                    <div className="Student_name">{username}</div>
                </div>
            ) || null}
            
            { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((id) => 
            <div key={id} className="Student_camera">
                <div className="Cam_image" src="../webcamIMG.jpg"/>
                <div className="Student_name">---</div>
            </div>
            )}
        </div>
    )
}