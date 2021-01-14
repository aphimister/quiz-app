import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const [score, setScores] = useState([]);

  const apiURL =
    'https://opentdb.com/api.php?amount=10&category=22&difficulty=hard&type=multiple';

  const apiCall = async (url) => {
    const call = await axios.get(url);
    setQuiz(call.data.results);
  };

  useEffect(() => {
    //calls the API on page load
    apiCall(apiURL);
  }, []);

  return (
    // quiz display
    <Questions quiz={quiz} />
  );
};

const Questions = (props) => {
  if (props.quiz[1]) {
    let i = -1;
    const questions = props.quiz.map((q) => {
      i++;
      return (
        // <div>Found something{i}</div>
        <QuizCard
          question={q.question}
          correct_answer={q.correct_answer}
          incorrect_answers={q.incorrect_answers}
          number={i}
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
        <AnswerList qNumber={props.number} answers={qArray} />
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
    return <Answer number={props.qNumber} answer={answer} key={i} />;
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
