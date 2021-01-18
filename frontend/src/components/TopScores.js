import React, {useState} from 'react';


const TopScores = (props) => {
    

    return (
        <div>
            <div className="title-container">
            <h1 className="title">Top Scores</h1>
            </div>
            <div className="top-score-list">
            <h4>{props.data.score}</h4>
            {/* <h4>{props.name}</h4> */}
            {/* <h4>{props.score}</h4> */}
            {/* <h4>{props.time}</h4> */}
            {/* <h4>{props.category}</h4> 
            <h4>{props.difficulty}</h4> */}

            </div>
        </div>
    )
}

export default TopScores
