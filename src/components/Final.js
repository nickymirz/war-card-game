import React from 'react'
import history from "../History";

export default function Final(props) {


    
    return (
        <div className="homeContainerBox">
            <div className="whiteBox">
            <h4>the winner is:</h4>
            <h1 className="ready"> {props.theWinner} </h1>
            <button className="again beat" onClick={()=>{history.push("/war-game")}}> Again? </button>
        </div>
        </div>
    )
}
