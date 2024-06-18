import ProgressBar from '@ramonak/react-progress-bar';
import { useEffect, useState } from 'react';
import './MentalHealthSurveyModule.css';
import { fetchMentalMoveSurveyData } from '../services/api';
import { Button } from 'semantic-ui-react';
import MentalHealthModuleMenu from './MentalHealthModuleMenu';

const MentalHealthSurveyModule = (props) => {
  const { locale, setLocale } = props;
  const [questions, setQuestions] = useState(null);
  const [lifeEvents, setLifeEvents] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [questionResponses, setQuestionResponses] = useState({});
  const [lifeEventsResponses, setLifeEventsResponses] = useState(
    Array(24).fill(0)
  );

  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchMentalMoveSurveyData(locale);
      setQuestions(
        data.attributes.questions.data.map((question) => {
          return question.attributes.content;
        })
      );

      setLifeEvents(
        data.attributes.lifeEvents.map((lifeEvent) => {
          return lifeEvent.children[0].text;
        })
      );
    };
    fetchData();
    console.log('CALLED');
  }, [locale]);

  function calculateQuizProgress() {
    const stepSize = 5.6;
    return Math.floor(stepSize * currentStep);
  }

  function setAnswerForStep(event, answer) {
    setTimeout(() => {
      setQuestionResponses((responses) => {
        return {
          ...responses,
          [currentStep]: answer,
        };
      });

      if (currentStep < 18) {
        setCurrentStep(currentStep + 1);
        event.target.checked = false;
      } else {
        calculateResults();
      }
    }, 500);
  }

  function setAnswerForLifetimeScore(optionIndex) {
    setLifeEventsResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[optionIndex] = 1;
      return updatedResponses;
    });
  }

  function calculateLifeEventScore() {
    return lifeEventsResponses.reduce((acc, curr) => acc + curr, 0);
  }

  function calculateMentalStateScore() {
    const questionNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return questionNumbers.reduce((total, questionNumber) => {
      return total + (questionResponses[questionNumber] || 0);
    }, 0);
  }

  function calculateResilienceScore() {
    const resilienceQuestions = [12, 13, 14, 15, 16, 17];
    const resilienceScores = resilienceQuestions.map(
      (questionNumber, index) => {
        let score = questionResponses[questionNumber] || 0;
        if (index % 2 === 1) {
          score = 6 - score;
        }
        return score;
      }
    );

    return (
      resilienceScores.reduce((total, score) => total + score, 0) /
      resilienceQuestions.length
    );
  }

  function calculateResults() {
    setResults({
      lifeEventScore: calculateLifeEventScore(),
      mentalStateScore: calculateMentalStateScore(),
      resilienceScore: calculateResilienceScore(),
    });
  }

  if (results) {
    return (
      <div className="mental-health-survey-module">
        <h1>Short well being survey</h1>
        <div>
          Thank you for completing the health check. These scores are intended
          to give insight into your mental health.
        </div>

        <div className="results">
          <h3>Your Mindfulness survey Score</h3>
          <p>
            <strong>Mental State Score:</strong> {results.mentalStateScore}
          </p>
          <p>
            <strong>Resilience Score:</strong> {results.resilienceScore}
          </p>
          <p>
            <strong>Life Time Events:</strong> {results.lifeEventScore}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mental-health-page-container">
      <MentalHealthModuleMenu setLocale={setLocale}></MentalHealthModuleMenu>

      <div className="mental-health-survey-module">
        {questions && (
          <>
            <h1>Short well being survey</h1>
            <div className="progress-bar-container">
              <span>{`Step ${currentStep} of 19`}</span>
              <ProgressBar completed={calculateQuizProgress()} />
            </div>
            <div className="content-container">
              <div className="question">{questions[currentStep - 1]}</div>

              {currentStep !== 1 && (
                <>
                  {currentStep === 8 ? (
                    <div className="checkboxOptions">
                      {lifeEvents.map((lifeEvent, index) => {
                        return (
                          <div className="checkbox">
                            <input
                              onChange={() => {
                                setAnswerForLifetimeScore(index);
                              }}
                              type="checkbox"
                            ></input>
                            <label>{lifeEvent}</label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="options">
                      <input
                        onChange={(e) => {
                          setAnswerForStep(e, 1);
                        }}
                        type="radio"
                      ></input>
                      <input
                        onChange={(e) => {
                          setAnswerForStep(e, 2);
                        }}
                        type="radio"
                      ></input>
                      <input
                        onChange={(e) => {
                          setAnswerForStep(e, 3);
                        }}
                        type="radio"
                      ></input>
                      <input
                        onChange={(e) => {
                          setAnswerForStep(e, 4);
                        }}
                        type="radio"
                      ></input>
                      <input
                        onChange={(e) => {
                          setAnswerForStep(e, 5);
                        }}
                        type="radio"
                      ></input>
                    </div>
                  )}
                </>
              )}

              {currentStep !== 8 && currentStep !== 1 && (
                <div className="labels">
                  <label>Always</label>
                  <label>Mostly</label>
                  <label>Sometimes</label>
                  <label>Now and then</label>
                  <label>Never</label>
                </div>
              )}
              <div className="button">
                {currentStep > 1 && (
                  <Button
                    onClick={() => {
                      setCurrentStep((currentStep) => currentStep - 1);
                    }}
                    size="medium"
                  >
                    Previous
                  </Button>
                )}
                {(currentStep === 1 || currentStep === 8) && (
                  <Button
                    onClick={() => {
                      setCurrentStep((currentStep) => currentStep + 1);
                    }}
                    size="medium"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MentalHealthSurveyModule;
