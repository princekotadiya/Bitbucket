import React, { useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import Results from "./Results";
import Question from "./Question";

interface QuestionType {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  explanation: string;
}

const ApiQuestion: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionsFromApi = async () => {
      const maxRetries = 1;
      let retryCount = 0;

      while (retryCount < maxRetries) {
        try {
          const response = await axios.get(
            "https://opentdb.com/api.php?amount=10"
          );
          const questions = response.data.results.map((q: any) => ({
            question: q.question,
            correct_answer: q.correct_answer,
            incorrect_answers: q.incorrect_answers,
            explanation: `Explanation for the correct answer: ${q.correct_answer}`,
          }));
          setQuestions(questions);
          setIsLoading(false);
          break; // Exit loop on successful fetch
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 429) {
              await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
              retryCount++;
              continue; 
            }
          }
          console.error('Error fetching questions:', error);
          setError("Failed to fetch questions. Please try again later.");
          setIsLoading(false);
          break;
        }
      }
    };

    fetchQuestionsFromApi();
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return <Results score={score} totalQuestions={questions.length} />;
  }

  return (
    <div>
      <Question
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        onNextQuestion={handleNextQuestion}
        questionNumber={currentQuestionIndex + 1}
      />
    </div>
  );
};

export default ApiQuestion;
