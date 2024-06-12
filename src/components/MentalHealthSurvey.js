import React, { useState } from 'react';
import './MentalHealthSurvey.css';

const options = ['Rare', 'Uncommon', 'Common', 'Almost always'];

const MentalHealthSurvey = (props) => {
  const { questions } = props;
  const [responses, setResponses] = useState(Array(questions.length).fill(''));

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  return (
    <div className="survey-container">
      <h2>How mindful are you?</h2>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="question-block">
          <p>{question}</p>
          <div className="options">
            {options.map((option, oIndex) => (
              <label key={oIndex}>
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={option}
                  checked={responses[qIndex] === option}
                  onChange={() => handleResponseChange(qIndex, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentalHealthSurvey;
