
export default function Participate({Buttons, Exam})
{
    return (
        <div>
            Name: {Exam.examName}
            <br />
            Search Id: {Exam.examSearchId}
            <br />
            Class Name: {Exam.className}
            <br />
            Question Num: {Exam.questionNum}
            <br />
            Start Time: {Exam.startTime}
            <br />
            End Time: {Exam.endTime}
            <br />
            <br/>
            {
                Buttons
            }
        </div>
    )
}