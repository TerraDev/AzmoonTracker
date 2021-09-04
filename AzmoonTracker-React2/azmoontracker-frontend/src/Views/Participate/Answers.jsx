import { Fragment } from "react"

export default function Answers({answers, exam})
{
    return (
        <>
            <h2> Student name: </h2>
            <p> {answers.userName} </p>
            <br />
            <b> exam name: </b> {answers.examName}
            <br/>
            {
                answers.answers.map(({questionId, answerText},idx)=>
                    <Fragment key={questionId}>
                        <hr />
                        <br />
                        Question # {questionId} :{exam.questions[idx].questionDescription}
                        {/*console.log({questionId, answerText, idx})*/}
                        <br /> 
                        <p style={{direction:"rtl"}}>
                        User's Answer: {answerText}
                        </p>
                    </Fragment>
                )
            }

        </>
    )
}