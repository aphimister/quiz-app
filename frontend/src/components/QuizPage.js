import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = (props) => {
  const [quiz, setQuiz] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const apiURL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

  let answers = [];
  for (let i = 0; i < 10; i++) {
    answers.push(false);
  }
  const [score, setScore] = useState(answers);

  const apiCall = async (url) => {
    const call = await axios.get(url);
    setQuiz(call.data.results);
  };

  const diffHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setDifficulty(value);
  };

  const quizHandler = (event) => {
    event.preventDefault();
    apiCall(apiURL);
    
  }

  // This is the category tracker / state handler
  const catHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setCategory(value);
  };
  const answerHandler = (event, answer, ref) => {
    let newScore = score;
    if (quiz[ref].correct_answer == answer) {
      console.log('correct');
      newScore[ref] = true;
    }
    // console.log(newScores[ref].correct);
    else {
      console.log('Wrong!');
      newScore[ref] = false;
    }
    setScore(newScore);
    console.log(score);
  };

  // useEffect(() => {
  //   //calls the API on page load

  //   apiCall(apiURL);
  // }, []);

  return (
    // quiz display
    
    <div >
      {quiz[1] ? <Questions quiz={quiz} answerHandler={answerHandler}/> : 
      <Selection category={category} difficulty={difficulty} answers={answers} diffHandler={diffHandler} catHandler={catHandler} quizHandler={quizHandler}/>}

    </div>
  );
};


const Selection = (props) => {
 

  return(

    <div>
      <h1 className="title">Home Page</h1>
      <form>
        <h2 className="subheading">Select your difficulty</h2>
        {/* The hander is passed to here and triggered "onChange" */}
        <select onChange={props.diffHandler} className="selectDiff">
          <option name="difficulty" value={'easy'}>
            Easy
          </option>
          <option name="difficulty" value={'medium'}>
            Medium
          </option>
          <option name="difficulty" value={'hard'}>
            Hard
          </option>
        </select>
        <h2 className="subheading">Select your category</h2>
        {/* As above, the handler is passed to here and triggered "onChange" */}
        <select onChange={props.catHandler} className="selectCat">
          <option value={'9'} name="category">
            General Knowledge
          </option>
          <option value={'10'} name="category">
            Entertainment: Books
          </option>
          <option value={'11'} name="category">
            Entertainment: Film
          </option>
          <option value={'12'} name="category">
            Entertainment: Music
          </option>
          <option value={'13'} name="category">
            Entertainment: Musicals & Theatres
          </option>
          <option value={'14'} name="category">
            Entertainment: Television
          </option>
          <option value={'15'} name="category">
            Entertainment: Video Games
          </option>
          <option value={'16'} name="category">
            Entertainment: Board Games
          </option>
          <option value={'17'} name="category">
            Science & Nature
          </option>
          <option value={'18'} name="category">
            Science: Computers
          </option>
          <option value={'19'} name="category">
            Science: Mathematics
          </option>
          <option value={'20'} name="category">
            Mythology
          </option>
          <option value={'21'} name="category">
            Sports
          </option>
          <option value={'22'} name="category">
            Geography
          </option>
          <option value={'23'} name="category">
            History
          </option>
          <option value={'24'} name="category">
            Politics
          </option>
          <option value={'25'} name="category">
            Art
          </option>
          <option value={'26'} name="category">
            Celebrities
          </option>
          <option value={'27'} name="category">
            Animals
          </option>
          <option value={'28'} name="category">
            Vehicles
          </option>
          <option value={'29'} name="category">
            Entertainment: Comics
          </option>
          <option value={'30'} name="category">
            Science: Gadgets
          </option>
          <option value={'31'} name="category">
            Entertainment: Japanese Anime & Manga
          </option>
          <option value={'32'} name="category">
            Entertainment: Cartoon & Animations
          </option>
        </select>
        <br />
        <br />
        <div>
        
        <button id="submit" className="button" onClick={props.quizHandler}>
          Submit
        </button>
      </div>
      </form>
  </div>
  )}


const Questions = (props) => {
   
  if (props.quiz[1]) {
    const questions = props.quiz.map((q, i) => {
      return (
        // <div>Found something{i}</div>
        <QuizCard
          question={q.question}
          correct_answer={q.correct_answer}
          incorrect_answers={q.incorrect_answers}
          number={i}
          key={i}
          answerHandler={props.answerHandler}
        />
      );
    });
    return <div className="quizContainer">{questions}</div>;
  } else {
    return <div className="loadingMessage">Loading questions</div>;
  }
};

const QuizCard = (props) => {
  if (props.question) {
    // checks there is an array
    let qArray = [props.correct_answer, ...props.incorrect_answers]; //new array of all the answers
    shuffleArray(qArray); //shuffles the questions
    return (
      <div className="questionCard" name={props.number}>
        <div className="question" name={props.number}>
          {props.question}
        </div>
        <AnswerList
          qNumber={props.number}
          answers={qArray}
          answerHandler={props.answerHandler}
        />
      </div>
    );
  } else {
    return <div>Loading questions</div>;
  }
};

const AnswerList = (props) => {
  //format for questions for the answer
  let i = 0;
  const answers = props.answers.map((answer) => {
    i++;
    return (
      <Answer
        number={props.qNumber}
        answer={answer}
        key={i}
        answerHandler={props.answerHandler}
      />
    );
  });
  return answers;
};

const Answer = (props) => {
  // format for each radio button
  return (
    // returns laid out button
    <div>
      <input
        type="radio"
        className="radioButton answer"
        name={props.number}
        id={props.answer}
        onClick={(e) => props.answerHandler(e, props.answer, props.number)}
      />
      <label htmlFor={props.answer}>{props.answer}</label>
    </div>
  );
};

const shuffleArray = (array) => {
  //Durstenfeld shuffle algorithm, credit https://stackoverflow.com/users/310500/laurens-holst
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export default QuizPage;