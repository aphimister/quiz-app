import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [quiz, setQuiz] = useState(['']);

 

  const apiURL =
    `https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple`

  const apiCall = async (url) => {
    const call = await axios.get(url);
    setQuiz(call.data.results);
  };
  // const {category} = this.props.location.state.category
  // const {difficulty} = this.props.location.state.difficulty
  // console.log(category)
  // console.log(difficulty)


  useEffect(() => {
    //calls the API on page load

    apiCall(apiURL);
  }, []);

  console.log(quiz);
  console.log(quiz[0].question);

  return (
    // quiz display
    <div>
      <QuizCard
        question={quiz[0].question}
        correct_answer={quiz[0].correct_answer}
        incorrect_answers={quiz[0].incorrect_answers}
        number={1}
      />
    </div>
  );
};

const QuizCard = (props) => {
  const question = props.question;
  const correctAns = props.correct_answer;
  const incorrectAns = props.incorrect_answers;
  const number = props.number;

  if (props.question) {
    return (
      <div className="quizCard">
        <div className="questionHeading">{question}</div>
        <input
          type="radio"
          className="radioButton"
          name={number}
          id={incorrectAns}
        />
        <label htmlFor={correctAns}>{correctAns}</label>
        <input
          type="radio"
          className="radioButton"
          name={number}
          id={incorrectAns[0]}
        />
        <label htmlFor={incorrectAns[0]}>{incorrectAns[0]}</label>
        <input
          type="radio"
          className="radioButton"
          name={number}
          id={incorrectAns[1]}
        />
        <label htmlFor={incorrectAns[1]}>{incorrectAns[1]}</label>
        <input
          type="radio"
          className="radioButton"
          name={number}
          id={incorrectAns[2]}
        />
        <label htmlFor={incorrectAns[2]}>{incorrectAns[2]}</label>
      </div>
    );
  } else {
    return <div>Loading questions</div>;
  }
};

export default QuizPage;
