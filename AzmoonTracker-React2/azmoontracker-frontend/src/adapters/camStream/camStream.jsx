  
import {useEffect, useState} from 'react';
//import { RouteComponentProps } from 'react-router';
//import webRtcAdapter from 'webrtc-adapter';
import * as signalR from '@microsoft/signalr';

/* interface WebRtcState {
    messages: string[]
}

interface WebRtcParams {
    groupName: string
}

interface WebRtcSdp {
    type: string,
    sdp: string
} */

export default function CamStream(props) {
    
    const connection  = new signalR.HubConnection()//: signalR.HubConnection;

    // Published Signaling service with TLS
    const url = `https://localhost:44389/signalrtc`;

    const refChatInput = props?.chatInputStream //: HTMLInputElement;
    const refChatAreaDiv = props?.globalChatStream //: HTMLDivElement;

    const localVideo = props?.vidStream //: HTMLVideoElement;
    const localStream = props?.medStream //: MediaStream;
    const remoteVideo = props?.remStream //: HTMLVideoElement;

    const rtcConfiguration /*: RTCConfiguration*/ = {
        'iceServers': [
            {
                'urls': 'stun:stun.l.google.com:19302'
            },
            {
                'urls': 'turn:192.158.29.39:3478?transport=udp',
                'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                'username': '28224511:1379330808'
            },
            {
                'urls': 'turn:192.158.29.39:3478?transport=tcp',
                'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                'username': '28224511:1379330808'
            }
        ]
    };

    const peerConnection = new RTCPeerConnection()/*: RTCPeerConnection;*/

    // Put variables in global scope to make them available to the browser console.
    const constraints /*: MediaStreamConstraints*/ = {
        audio: true,
        video: true
    };

    const [message, setMessage] = useState({messages: 'Welcome to app'});
    /*
    constructor() {
        super();
        this.connection = null;
        this.state = {
            messages: ['Welcome in app']
        };

        this.handleError.bind(this);
        this.handleSendOffer.bind(this);
        this.handleSdp.bind(this);
        this.handleStop.bind(this);
        this.handleStart.bind(this);
        this.handleIceCandidate.bind(this);
    }
    */

    useEffect(()=> {
        // create Connection
        connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(url, signalR.HttpTransportType.WebSockets)
            .build();


        // start connection
        connection.start()
            .catch((err) => {
                console.error(err)
            })
            .then(() => {

                // Send Groupname to register in signaling service
                connection.invoke('JoinGroup', props.groupName)
                    .then(() => {
                        console.info('Group registered');
                    });

                // Simple group Message recive
                connection.on('Message', (msg) => {
                    setMsg('Recive: ' + msg);
                });

                connection.on('Sdp', handleSdp);
                connection.on('IceCandidate', handleIceCandidate);
            });
        return() => {
            connection.stop();
            connection = null;
            handleStop();
        }
    },[])

/*
    componentWillUnmount() {
        this.connection.stop();
        this.connection = null;
        this.handleStop();
    }
    */

    // Add message to Chat area
    const setMsg = (msg) => {
        setMessage({
            messages: message.messages.concat([msg])
        }, () => {
            refChatAreaDiv.scrollTop = refChatAreaDiv.scrollHeight;
        });
    }

    // Handler for button send in chat
    const handleSend = () => {
        setMsg('You: ' + refChatInput.value);
        if (connection == null) {
            console.warn('Not connected');
            return;
        }
        connection.invoke('GroupMessage',
            { GroupName: props.groupName, Message: refChatInput.value }
        );
        refChatInput.value = '';
    }

    const handleStart = () => {
        navigator
            .mediaDevices
            .getUserMedia(constraints)
            .then((stream /*: MediaStream*/) => {
                stream.oninactive = function () {
                    console.log('Stream inactive');
                };
                //window.stream = stream; // make variable available to browser console
                localVideo.srcObject = stream;
                localStream = stream;

                var videoTracks = localStream.getVideoTracks();
                var audioTracks = localStream.getAudioTracks();
                if (videoTracks.length > 0) {
                    console.log('Using video device: ' + videoTracks[0].label);
                }
                if (audioTracks.length > 0) {
                    console.log('Using audio device: ' + audioTracks[0].label);
                }

                console.log('Got stream with constraints:', constraints);
                console.log('Using video device: ' + videoTracks[0].label);
                
                peerConnection = new RTCPeerConnection(rtcConfiguration);
                console.log('Created local peer connection');

                peerConnection.onicecandidate = (e) => {
                    console.log('onicecandidate ', JSON.stringify(e.candidate));
                    //console.log('On ice candidate', e);
                    //this.peerConnection.addIceCandidate(e.candidate);
                    connection.invoke('GroupIceCandidate',
                        { GroupName: props.groupName, IceCandidate: e.candidate }
                    );
                };

                peerConnection.oniceconnectionstatechange = function (e) {
                    console.log('ICE state change event: ', e);
                };

                peerConnection.onaddstream = (e) => {
                    console.log('onaddstream ', e);
                    remoteVideo.srcObject = e.stream;
                };

                peerConnection.addStream(localStream);
                console.log('handleSuccess end');
            })
            .catch(handleError);
    };

    const handleStop = () => {
        if (peerConnection) {
            peerConnection.close()
            peerConnection = null;
        }

        localVideo.srcObject = null;

        if (localStream) {
            localStream.getVideoTracks().forEach((v) => {
                v.stop();
            });
            localStream.getAudioTracks().forEach((v) => {
                v.stop();
            });
        }
    };

    const handleSdp = (sdp /*: WebRtcSdp*/ ) => {
        // Init from Caller, not by button send Offer
        console.debug('Recive SDP\n', sdp);

        var typeSdp = GetType(sdp.type.toString());

        var s = {
            sdp: sdp.sdp, type: typeSdp
        };

        if (s.type == "offer") {
            
            peerConnection.setRemoteDescription(s);

            peerConnection.createAnswer().then((answer) => {

                console.debug("Success createAnswer\n", answer);
                peerConnection.setLocalDescription(answer);
                
                // SEND Answer
                connection.invoke('GroupSdp', {
                    GroupName: props.groupName,
                    Sdp: {
                        Type: answer.type,
                        Sdp: answer.sdp
                    }
                })
                .then(() => {
                    console.info('Offer sended, finish this side');
                });
            });

        } else if (s.type == "answer") {

            // Peer must be created and configured
            peerConnection.setRemoteDescription(s).then(() => {
                console.log('Success setRemoteDescription, finish signaling');

            });

        }
    }

    const handleIceCandidate = (iceCandidate /*: RTCIceCandidate*/) => {
        if (peerConnection) {
            peerConnection.addIceCandidate(iceCandidate);
        } else {
            console.warn('handleIceCandidate ', JSON.stringify(iceCandidate));
        }
    }

    const handleSendOffer = () => {
        // check if started
        if (peerConnection) {

            peerConnection.createOffer().then((sdp) => {
                console.log('Offer from loacal\n' + sdp.sdp);

                peerConnection.setLocalDescription(sdp).then(() => {
                    console.log('Success setLocalDescription, wait for answer');
                });

                let groupSDP = {
                    GroupName: props.groupName,
                    Sdp: {
                        Type: sdp.type,
                        Sdp: sdp.sdp
                    }
                };

                connection.invoke('GroupSdp', groupSDP)
                    .then(() => {
                        console.info('Offer sended');
                    });
            });
        } else {
            setMsg('WebRTC not started');
        }
    };



    function GetType(type) {
        switch (type) {
            case "0": return "offer";
            case "1": return "pranswer";
            case "2": return "answer";
            default:
        }
        return "pranswer";
    };

    function Width(video /*: boolean | MediaTrackConstraints*/) {
        return ((video /*as MediaTrackConstraints*/).width /*as ConstrainLongRange*/).exact;
    }; 

    const handleError = (error) => {
        if (error.name === 'ConstraintNotSatisfiedError') {
            console.error('The resolution ' + Width(constraints.video) + 'x' +
                Width(constraints.video) + ' px is not supported by your device.');
        } else if (error.name === 'PermissionDeniedError') {
            console.error('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
        }
        console.error('getUserMedia error: ' + error.name, error);
    }
    
    return(<></>)
}