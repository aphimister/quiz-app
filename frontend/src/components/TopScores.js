import React, {useState, useEffect} from 'react';


const TopScores = (props) => {
    const [sortedArray, setSortedArray] = useState([]);


    useEffect(() => {
        let temp = props.data;
        if(props.data){temp.sort((a, b) => (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.time > b.time) ? 1 : -1) : -1 )
        setSortedArray(temp)}
        
    }, [props.data])
    
    // console.log(sortedArray[0].user.name)
    return (
        <div >
            <div className="title-container">
            <h1 className="title">Top Scores</h1>
            </div>
            <div className="top-score-list">
                <table className="table">
                    <tr className="tableRow">
                        <th className="tableHeader">Score</th>
                        <th className="tableHeader">Name</th>
                        <th className="tableHeader">Time</th>
                    </tr>
                        {sortedArray.slice(0,10).map((item, index)=>{
                            console.log(item)
                            return(
                                <tr className="tableRow">
                                    <td className="tableData">{item.score}</td> 
                                    <td className="tableData">{item.user.name}</td>
                                    <td className="tableData">{item.time} secs</td>
                                </tr>
                            )
                        })}
                </table>

            </div>
        </div>
    )
}

export default TopScores
