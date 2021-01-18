import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = (props) => {
  const [quiz, setQuiz] = useState([]);
  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('easy');

  const apiURL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

  let zeroes = [];
  for (let i = 0; i < 10; i++) {
    zeroes.push(0);
  }

  const [score, setScore] = useState([...zeroes]);
  const [isAnswered, setIsAnswered] = useState([...zeroes]);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const shuffleArray = (array) => {
    //Durstenfeld shuffle algorithm, credit https://stackoverflow.com/users/310500/laurens-holst
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const apiCall = async (url) => {
    const call = await axios.get(url);
    const unshuffled = call.data.results;
    const shuffled = unshuffled.map((q) => {
      let qArray = [q.correct_answer, ...q.incorrect_answers];
      shuffleArray(qArray);
      q.answers = qArray;
      return q;
    });
    setQuiz(shuffled);
  };

  const diffHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setDifficulty(value);
  };

  const quizHandler = (event) => {
    event.preventDefault();
    apiCall(apiURL);
  };

  // This is the category tracker / state handler
  const catHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setCategory(value);
  };
  const answerHandler = (event, answer, ref) => {
    let newScore = score;
    let answered = isAnswered;
    isAnswered[ref] = 1;
    setIsAnswered(answered);
    const reducer = (accumulator, item) => {
      return accumulator + item;
    };
    setTotalAnswered(score.reduce(reducer, 0));
    console.log(totalAnswered);
    if (quiz[ref].correct_answer == answer) {
      newScore[ref] = 1;
    } else {
      newScore[ref] = 0;
    }
    setScore(newScore);
  };

  const scoreHandler = async (event) => {
    const body = {
      score: score,
      difficulty: difficulty,
      category: category,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('/api/score', body, config);
    console.log(response);
  };

  return (
    // quiz display

    <div>
      {quiz[1] ? (
        <Questions
          quiz={quiz}
          answerHandler={answerHandler}
          scoreHandler={scoreHandler}
        />
      ) : (
        <Selection
          diffHandler={diffHandler}
          catHandler={catHandler}
          quizHandler={quizHandler}
        />
      )}
      {totalAnswered === 10 ? (
        <button
          id="submitAnswers"
          className="button"
          onClick={props.scoreHandler}
        >
          Submit
        </button>
      ) : null}
    </div>
  );
};

const Selection = (props) => {
  return (
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
  );
};

const Questions = (props) => {
  if (props.quiz[1]) {
    const questions = props.quiz.map((q, i) => {
      return (
        // <div>Found something{i}</div>
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
    return <div className="quizContainer">{questions}</div>;
  } else {
    return <div className="loadingMessage">Loading questions</div>;
  }
};

const QuizCard = (props) => {
  if (props.question) {
    // checks there is an array
    return (
      <div className="questionCard" name={props.number}>
        <div className="question" name={props.number}>
          {props.question}
        </div>
        <AnswerList
          qNumber={props.number}
          answers={props.answers}
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

export default QuizPage;
