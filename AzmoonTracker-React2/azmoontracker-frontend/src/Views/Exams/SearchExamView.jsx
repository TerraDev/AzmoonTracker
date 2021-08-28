import { useRef, useState } from "react"
import "../../styles/SearchExam.css"


export default function SearchExamView(props)
{
    const [searched, Setsearched] = useState(false)

    return(
        <div className="searchBar">
            <input type="search" className="searchField" id="searchF"/>
            <button className="searchButton" 
            onClick={()=>{props.SearchFunc(document.getElementById("searchF").value); Setsearched(true)}}>Search</button>
            {
                searched ?
                <button className="backButton"
                onClick={()=>{Setsearched(false); props.SearchFunc("")}}>back</button> : null
            }
        </div>
    )
}