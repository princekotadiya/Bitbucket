import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../componet/Results.css'; 

const Results = ({ score, totalQuestions }: { score: number; totalQuestions: number }) => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate('/');
    window.location.reload();
  };

  // const resultClass = score / totalQuestions > 0.5 ? 'correct' : 'wrong'; 

  return (
    <div className={`results-container `}>
      <h2 className='results'>Results</h2>
      <p className='total-q'>Total Questions Served: {totalQuestions}</p>
      <p className='total-c'>Total Correct Questions: {score}</p>
      <p className='total-i'>Total Incorrect Questions: {totalQuestions - score}</p>
      <button className="restart-btn" onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default Results;
