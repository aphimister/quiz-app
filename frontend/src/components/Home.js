import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {

    const [difficulty, setDifficulty] = useState("");
    const [category, setCategory] = useState("");
    const [selectCat, setSelectCat] = useState([]);
    let data =[];

    useEffect( () => {
        makeGetRequest()
    }, []);
    //    should put this available as soon as the page loads
    // currently doesn't but working on that
 

    const formHandler = async (event) => {
        event.preventDefault();
    }        
    // when the form is submitted, the submit triggers the function
    // this function stops the form going to another url

    const makeGetRequest = async () => {

        let res = await axios.get('https://opentdb.com/api_category.php')      
        data = res.data;

        setSelectCat(res.data.trivia_categories);
        console.log(selectCat)
      }
    // gathers the api category data from the api   


    return (
        <div>
            <h1 className="title">Home Page</h1>

            <form onSubmit={formHandler}>
            <h2 className="subheading">Select your difficulty</h2>
                <select name="difficulty" className="selectDiff" onChange={(e) => {setDifficulty(e.target.value)}}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <h2 className="subheading">Select your category</h2>
                <select name="category" className="selectCat">
                    
                <select>{data}</select>
                
                </select><br /><br />
                <button className="button" type="submit">Start your quiz</button>
            </form>
            
        </div>
    )
}

export default Home
