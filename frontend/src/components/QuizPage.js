import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const [state, setstate] = useState('');
  let answers = [];
  for (let i = 0; i < 10; i++) {
    answers.push(false);
  }
  const [score, setScore] = useState(answers);
  const apiURL = `https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple`;

  const apiCall = async (url) => {
    const call = await axios.get(url);
    setQuiz(call.data.results);
  };
  // const {category} = this.props.location.state.category
  // const {difficulty} = this.props.location.state.difficulty
  // console.log(category)
  // console.log(difficulty)

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

  useEffect(() => {
    //calls the API on page load

    apiCall(apiURL);
  }, []);

  return (
    // quiz display
    <div>
      <Questions quiz={quiz} answerHandler={answerHandler} />
      <button id="submit" className="button">
        Submit
      </button>
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
