import React, {useState, useEffect} from 'react';


const TopScores = (props) => {
    const [sortedArray, setSortedArray] = useState([]);


    useEffect(() => {
        let temp = props.data;

        if(props.data){temp.sort((a, b) => (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.time > b.time) ? 1 : -1) : -1 )
        temp.slice(0,10)
        setSortedArray(temp)}
    }, [props.data])


    return (
        <div>
            <div className="title-container">
            <h1 className="title">Top Scores</h1>
            </div>
            <div className="top-score-list">
                <table>
                    <tr>
                        <th>Score</th>
                        <th>Name</th>
                        <th>Time</th>
                    </tr>
                        {sortedArray.map((item, index)=>{
                            return(
                                <tr>
                                <td>{item.score}</td> 
                                <td>{item.user.name}</td> 
                                <td>{item.time}</td>
                                </tr>
                            )
                        })}
                </table>

            </div>
        </div>
    )
}

export default TopScores
