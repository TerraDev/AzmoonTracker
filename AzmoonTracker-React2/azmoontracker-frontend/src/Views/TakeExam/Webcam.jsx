import { useEffect, useRef, useState } from "react"
import "../../styles/webcam.css"
import camStream from "../../adapters/camStream/camStream"

export default function Webcam(props){

    const [playing,setPlaying] = useState(false);

    const vid = useRef(null);

	const startVideo = () => {
		setPlaying(true);
		navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementsByClassName('webcamView')[0];
				if (video) {
					video.srcObject = stream;
				}
			},
			(err) => console.error(err)
		);
        //write here
	};

	const stopVideo = () => {
		setPlaying(false);
		let video = document.getElementsByClassName('webcamView')[0];
		video.srcObject.getTracks()[0].stop();
	};
	
    return(
        <>
        <label htmlFor="camTrigger">
            <a id="camExpand"> Webcam </a>
        </label>
        <input type="checkbox" id="camTrigger"/>
        <div className="webcam">
            <video className="webcamView" autoPlay mute ref={vid}>
            </video>
            {//<button className="camButton">continue</button>
            }
            {playing ? (
                <>
                    <button onClick={stopVideo} className="camButton">Stop</button>
                    <camStream groupName={props.examId} stream={vid.current}/>
                </>
				) : (
				<button onClick={startVideo} className="camButton">Start</button>
			)}
        </div>
    </>
    )
}