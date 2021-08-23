import { Fragment } from "react"
import { Link } from "react-router-dom"
//import React,{Component} from 'react'


export default function Participants(props)
{
    console.log(props)
    return (
        <>
            <h2>Participants of exam: {props.examId}</h2>
            {props.participants.map(({userId,username}) => 
            <Fragment key={userId}>
                <div>Username: {username}</div>
                <Link to={`/Answers/${props.examId}/${userId}`}>view answers</Link>
                <hr/>
            </Fragment> 
            )}
        </>
    )
}


/*

<Fragment key={participant.UserId}>
<div>Username: {participant.Username}</div>
<Link to=""></Link>
<hr/>
</Fragment> 

<Link to=`/Answers/:ExamId/:StudentId?`>view answers</Link>

*/