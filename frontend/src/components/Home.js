import React, {useState, useEffect}from 'react';

import axios from 'axios';
import QuizPage from './QuizPage';
import {Link} from "react-router-dom";


const Home = () => {

    const [difficulty, setDifficulty] = useState("");
    const [category, setCategory] = useState("");
    const [selectCat, setSelectCat] =useState([]);

    useEffect( () => {
    
    }, []);
    //    should put this available as soon as the page loads
    // currently doesn't but working on that
 

    const formHandler = async (event) => {
        event.preventDefault();
        setDifficulty({
            ...difficulty,
            [event.target.name]:event.target.value
        })
        setCategory({
            ...category,
            [event.target.name]:event.target.value
        })
    }        
    // when the form is submitted, the submit triggers the function
    // this function stops the form going to another url and upsdates the state
    // need to pass this to the quix page

    return (
        <div>
            <h1 className="title">Home Page</h1>

             <form className="form" onSubmit={formHandler}>
            <h2 className="subheading">Select your difficulty</h2>
                <select className="selectDiff">
                    <option name="difficulty" value={"easy"}>Easy</option>
                    <option name="difficulty" value={"medium"}>Medium</option>
                    <option name="difficulty" value={"hard"}>Hard</option>
                </select>
                <h2 className="subheading">Select your category</h2>
                <select className="selectCat">
                    
                    <option value={"9"} name="category">General Knowledge</option> 
                    <option value={"10"} name="category">Entertainment: Books</option>
                    <option value={"11"} name="category">Entertainment: Film</option>
                    <option value={"12"} name="category">Entertainment: Music</option> 
                    <option value={"13"} name="category">Entertainment: Musicals & Theatres</option>
                    <option value={"14"} name="category">Entertainment: Television</option>
                    <option value={"15"} name="category">Entertainment: Video Games</option> 
                    <option value={"16"} name="category">Entertainment: Board Games</option>
                    <option value={"17"} name="category">Science & Nature</option>
                    <option value={"18"} name="category">Science: Computers</option> 
                    <option value={"19"} name="category">Science: Mathematics</option>
                    <option value={"20"} name="category">Mythology</option>
                    <option value={"21"} name="category">Sports</option> 
                    <option value={"22"} name="category">Geography</option>
                    <option value={"23"} name="category">History</option>
                    <option value={"24"} name="category">Politics</option> 
                    <option value={"25"} name="category">Art</option>
                    <option value={"26"} name="category">Celebrities</option>
                    <option value={"27"} name="category">Animals</option> 
                    <option value={"28"} name="category">Vehicles</option>
                    <option value={"29"} name="category">Entertainment: Comics</option>
                    <option value={"30"} name="category">Science: Gadgets</option> 
                    <option value={"31"} name="category">Entertainment: Japanese Anime & Manga</option>
                    <option value={"32"} name="category">Entertainment: Cartoon & Animations</option>
                </select><br /><br />
                <Link to={{ 
                    pathname:"/quiz", 
                    state:{ category: category, difficulty: difficulty}
                    }}>
                    <button className="button" type="submit">Start your quiz</button>
                </Link>
            </form>
            
        </div>
    )
}

export default Home
