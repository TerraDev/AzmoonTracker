import React from 'react'
import {useForm} from "react-hook-form"
import '../../styles/TakeExam.css'

export default function TakeExam(props) {
    
    //const {register, handleSubmit, formState: {errors}} = useForm() ;

    //const onSubmit = (data) =>
    //{
    //    console.log(data);
    //}

    return (
        <div className="main_exam">
            <h1>exam title: {props.match.params.ExamId}</h1>
            <p className="timer">timer is disabled 00:00:00</p>
            <h2>class name:
            <br/>
            BCE Comp UI
            </h2>
            <br/>
            <form>
                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" className="for_NAV" defaultChecked/>
                        <label for="tab-1">1</label>
                        
                        <div className="content">
                            1.
                            this is a descriptive question:
                                <br/>
                            <input type="text" style={{width: "95%"}}/>
                            <br/>
                        </div> 
                    </div>
                    
                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" className="for_NAV"/>
                        <label for="tab-2">2</label>
                        
                        <div className="content">
                            2.
                            This is a multi-choice question:
                            <br/>
                                <input type="radio" id="tab-1" name="q2" value="abc" defaultChecked/>1- abc <br/>
                                <input type="radio" id="tab-1" name="q2" value="xyz" />2- xyz <br/>
                                <input type="radio" id="tab-1" name="q2" value="klm" />3- klm <br/>
                                <input type="radio" id="tab-1" name="q2" value="eee" />4- eee <br/>
                            <br/>
                        </div> 
                    </div>

                    <div className="tab">
                        <input type="radio" id="tab-3" name="tab-group-1" className="for_NAV"/>
                        <label for="tab-3">3</label>
                    
                        <div className="content">
                            3.
                            What is 3+3?
                            <br/>
                            <input type="text" style={{width: "95%"}}/>
                        </div> 
                    </div>
                    
                    <div className="tab">
                        <input type="radio" id="tab-4" name="tab-group-1" className="for_NAV"/>
                        <label for="tab-4">submit</label>
                    
                        <div className="content">
                            submit once finished:
                            <br/>
                            <input type="submit" value="submit answers"/>
                        </div> 
                    </div>
                    
                </div>
            </form>
        </div>
    )
}