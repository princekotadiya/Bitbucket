import React, { useState } from "react";
import "./Question.css";

interface QuestionProps {
  question: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    explanation: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  questionNumber: number;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  onNextQuestion,
  questionNumber,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allAnswers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  const handleSubmit = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === question.correct_answer;
      onAnswer(isCorrect);
      setShowExplanation(true);
      setValidationError(false);
      setSubmitted(true);
    } else {
      setValidationError(true);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setValidationError(false);
    setSubmitted(false);
    onNextQuestion();
  };

  return (
    <div className="question-container">
        <h1 className="quiz-question">Quiz Question</h1>
      <h2 className="question">
        <span className="question-number">Q:{questionNumber}</span> 
        <span dangerouslySetInnerHTML={{ __html: question.question }} />
      </h2>
      <div className="answers">
        {allAnswers.map((answer, index) => (
          <div key={index} className="answer">
            <input
              type="radio"
              id={answer}
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={submitted}
            />
            <label
            className="options"
              htmlFor={answer}
              dangerouslySetInnerHTML={{ __html: answer }}
            ></label>
          </div>
        ))}
      </div>
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={submitted}
      >
        Submit
      </button>
      {validationError && (
        <p className="error">
          {selectedAnswer ? "" : "Please select an answer before submitting..."}
        </p>
      )}
      {showExplanation && (
        <div className="explanation">
          {/* <p>{selectedAnswer === question.correct_answer ? 'Correct!' : 'Wrong!'}</p>
          {selectedAnswer !== question.correct_answer && (
            <p>{question.explanation}</p>
          )} */}

          <p
            className={
              selectedAnswer === question.correct_answer ? "correct" : "wrong"
            }
          >
            {selectedAnswer === question.correct_answer ? "Correct!" : "Wrong!"}
          </p>
          {selectedAnswer !== question.correct_answer && (
            <p>{question.explanation}</p>
          )}
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
