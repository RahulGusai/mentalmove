import React, { useState } from 'react';
import './MentalHealthSurvey.css';
import { Button } from 'semantic-ui-react';
import { submitSurveyFormScores } from '../services/api';

const options = ['Rare', 'Uncommon', 'Common', 'Almost always'];

const MentalHealthSurvey = (props) => {
  const { questions, loggedIn } = props;

  const acceptanceFields = ['3', '5', '7', '8', '11', '12', '13', '14'];
  const presenceFields = ['0', '1', '2', '4', '6', '10'];

  const [showResults, setShowResults] = useState(false);
  const [acceptanceScore, setAcceptanceScore] = useState(0);
  const [presenceScore, setPresenceScore] = useState(0);
  const [responses, setResponses] = useState({});

  const handleResponseChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const calculateScore = (fields) => {
    let score = 0;
    fields.forEach((field) => {
      score += parseInt(responses[field] || 0, 10);
    });
    return score;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const acceptance = calculateScore(acceptanceFields);
    const presence = calculateScore(presenceFields);
    setAcceptanceScore(acceptance);
    setPresenceScore(presence);
    setShowResults(true);

    try {
      const data = {
        companyCode: loggedIn.companyCode,
        acceptanceScore: acceptance,
        presenceScore: presence,
      };
      console.log(data);
      await submitSurveyFormScores(data);
      console.log('Scores submitted successfully');
    } catch (error) {
      console.error('Failed to submit scores', error.message);
    }
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
                  value={oIndex + 1}
                  onChange={() => handleResponseChange(qIndex, oIndex + 1)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button onClick={handleSubmit}>Submit</Button>
      {showResults && (
        <div className="results">
          <h3>Your Mindfulness Score</h3>
          <p>
            <strong>Acceptance (max. score: 32):</strong> {acceptanceScore}
          </p>
          <p>
            <strong>Presence (max. score: 24):</strong> {presenceScore}
          </p>
          <p>
            How higher your score, the more mindful you are. The minimum score
            is 14 and the maximum score is 56. The acceptance score reflects
            your ability to accept both positive and negative experiences. The
            presence score indicates your ability to be present in the here and
            now. A low score does not mean something is wrong; this
            questionnaire is only intended to make you aware of your current
            ability to be in the now and accept all experiences.
          </p>
        </div>
      )}
    </div>
  );
};

export default MentalHealthSurvey;
