import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuizPage = (props) => {
  const [quiz, setQuiz] = useState([]); //quiz array
  const [category, setCategory] = useState('9'); //category state for api
  const [difficulty, setDifficulty] = useState('easy'); //difficulty state for api
  const [message, setMessage] = useState(''); //error message
  const [seconds, setSeconds] = useState(0); //timer
  const [isActive, setIsActive] = useState(false); //is timer on?
  const [display, setDisplay] = useState(0); //which display to show
  const [user, setUser] = useState(''); //your user info
  const [id, setId] = useState([]); //your user id
  const [dataLoaded, setDataLoaded] = useState(false); //have we loaded user info yet?

  let fetchData = async () => {
    //fetches user info
    const response = await axios.get('/api/user');
    setUser(response.data.name);
    setId(response.data.id);
    setDataLoaded(true);
  };

  useEffect(() => {
    //auth checker
    fetchData();
  }, []);

  useEffect(() => {
    if (user === 'Guest') {
      setDisplay(3);
    }
  }, [dataLoaded]); //authentication useeffect. If you're not logged in, naff off

  let zeroes = [];
  for (let i = 0; i < 10; i++) {
    //just a nice array of 0s
    zeroes.push(0);
  }

  const [score, setScore] = useState([...zeroes]); //score set to 0
  const [isAnswered, setIsAnswered] = useState([...zeroes]); //tracks whether each question is answered

  const apiURL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`;

  const apiCall = async (url) => {
    // call to the api for the quiz
    const call = await axios.get(url);
    const unshuffled = call.data.results;
    const shuffled = unshuffled.map((q) => {
      //decodes strings and shuffles answers
      let qArray = [q.correct_answer, ...q.incorrect_answers];
      qArray = qArray.map((q) => {
        return decodeURIComponent(q);
      });
      shuffleArray(qArray);
      q.answers = qArray;
      q.correct_answer = decodeURIComponent(q.correct_answer);
      q.question = decodeURIComponent(q.question);
      return q;
    });
    setQuiz(shuffled);
  };

  const diffHandler = (event) => {
    //difficulty option list handler
    event.preventDefault();
    let value = event.target.value;
    setDifficulty(value);
  };

  const quizHandler = (event) => {
    //calls the api with the parameters when you've chosen them
    event.preventDefault();
    apiCall(apiURL);
    setIsActive(true); //starts the timer
    setDisplay(1); //switches screen
  };

  // This is the category tracker / state handler when selecting the quiz
  const catHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setCategory(value);
  };

  const answerHandler = (event, answer, ref) => {
    //keeps a running total of your score and whether you've answered each question while you play
    let newScore = score;
    let answered = isAnswered;
    answered[ref] = 1;
    setIsAnswered(answered);
    if (quiz[ref].correct_answer === answer) {
      newScore[ref] = 1;
    } else {
      newScore[ref] = 0;
    }
    setScore(newScore);
  };
  const reducer = (accumulator, item) => {
    //simple function to sum an array in conjunction with the array.reduce method
    return accumulator + item;
  };

  const scoreHandler = async (event) => {
    //handler for submitting score, checks if all qs answered, compiles marks, etc.
    let totalAnswered = isAnswered.reduce(reducer, 0);
    if (totalAnswered === 10) {
      setIsActive(false);
      let totalScore = score.reduce(reducer, 0);
      const body = {
        score: totalScore,
        time: seconds,
        difficulty: difficulty,
        category: category,
        user: id,
      };
      props.dataHandler(body);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post('/api/score', body, config);
      setDisplay(2);
    } else
      setMessage(
        //throws a nice little message if you miss a question
        `Please answer all questions before submitting. You have ${
          10 - totalAnswered
        } unanswered questions`
      );
  };

  let displays = [
    //clever array of different functional components
    <Selection
      diffHandler={diffHandler}
      catHandler={catHandler}
      quizHandler={quizHandler}
    />,
    <Questions
      quiz={quiz}
      answerHandler={answerHandler}
      scoreHandler={scoreHandler}
      seconds={seconds}
      setSeconds={setSeconds}
      isActive={isActive}
      setIsActive={setIsActive}
      message={message}
    />,
    <Score time={seconds} score={score.reduce(reducer, 0)} user={user} />,
    <div className="subtitle">
      Please login before taking a quiz
      <br />
      <Link className="link" to="/login">
        <button className="button">Login</button>
      </Link>
    </div>,
  ];

  return (
    // chooses from the displays array according to the state

    <div>{displays[display]}</div>
  );
};

const Selection = (props) => {
  //display for selecting your quiz
  return (
    <div>
      <div className="subtitle">Select your quiz</div>
      <form>
        <div className="subheading">Select your difficulty</div>
        {/* The hander is passed to here and triggered "onChange" */}
        <select onChange={props.diffHandler} className="selector selectDiff">
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
        <div className="subheading">Select your category</div>
        {/* As above, the handler is passed to here and triggered "onChange" */}
        <select onChange={props.catHandler} className="selector selectCat">
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
  );
};

const Questions = (props) => {
  //displays all the questions
  if (props.quiz[1]) {
    const questions = props.quiz.map((q, i) => {
      return (
        <QuizCard
          question={q.question}
          correct_answer={q.correct_answer}
          answers={q.answers}
          number={i}
          key={i}
          answerHandler={props.answerHandler}
        />
      );
    });
    return (
      <div className="quizPage">
        <div className="quizContainer">{questions}</div>
        <div className="message">{props.message}</div>
        <button
          id="submitAnswers"
          className="button"
          onClick={props.scoreHandler}
        >
          Submit
        </button>
        <Timer
          seconds={props.seconds}
          setSeconds={props.setSeconds}
          isActive={props.isActive}
          setIsActive={props.setIsActive}
        />
      </div>
    );
  } else {
    //little loading display while we wait for the api call
    return <div className="loadingMessage">.</div>;
  }
};

const QuizCard = (props) => {
  if (props.question) {
    // checks there is an array
    return (
      <div className="quizCard" name={props.number}>
        <div className="question" name={props.number}>
          {props.question}
        </div>
        <div className="answerListContainer">
          <AnswerList
            qNumber={props.number}
            answers={props.answers}
            answerHandler={props.answerHandler}
          />
        </div>
        <br />
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

    <label className="answerContainer" htmlFor={props.answer}>
      <input
        type="radio"
        className="radioButton answer"
        name={props.number}
        id={props.answer}
        onClick={(e) => props.answerHandler(e, props.answer, props.number)}
      />
      {props.answer}
    </label>
  );
};

const Timer = (props) => {
  //timer component
  const isActive = props.isActive;
  const setIsActive = props.setIsActive;
  const seconds = props.seconds;
  const setSeconds = props.setSeconds;

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds]);

  if (props.isActive) {
    return (
      <div className="timer">
        <div className="time">{props.seconds}s</div>
      </div>
    );
  } else {
    return null;
  }
};

const Score = (props) => {
  //score display at end of quiz
  return (
    <div className="gzMessage">
      Nice one! You got {props.score} correct out of 10, in {props.time}s!
      <br />
      How does your score compare?
      <br />
      <Link to="/topscores">
        <button className="button">See the leaderboards</button>
      </Link>
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
