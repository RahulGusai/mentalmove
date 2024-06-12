// src/components/MentalHealthModule.js
import React, { useEffect, useRef, useState } from 'react';
import { fetchMentalHealthPage2Data } from '../services/api';
import MentalHealthModuleFooter from './MentalHealthModuleFooter';
import MentalHealthSurvey from './MentalHealthSurvey';

const MentalHealthPage2 = (props) => {
  const { currentIndex, setCurrentIndex } = props;

  const [text, setText] = useState(null);
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState(null);
  const contentRef = useRef(null);

  function fetchQuestions(surveyForm) {
    const questionsArr = surveyForm.attributes.questions;
    return questionsArr.map((questionObj) => {
      return questionObj.children[0].text;
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchMentalHealthPage2Data();
      setImage(data.attributes.image.data);
      setText(data.attributes.content.data);
      setQuestions(fetchQuestions(data.attributes.survey_form.data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (text) {
      contentRef.current.innerText = text.attributes.content;
    }
  }, [text]);

  return (
    <div className="mental-health-page">
      <h1>Mental Health Module</h1>
      {image && (
        <div className="image">
          <img src={image.attributes.URL} alt={image.attributes.Title} />
          <span>{image.attributes.Title}</span>
        </div>
      )}
      {text && (
        <div className="textContent">
          <h2>{text.attributes.title}</h2>
          <div ref={contentRef}></div>
        </div>
      )}
      {questions && (
        <MentalHealthSurvey questions={questions}></MentalHealthSurvey>
      )}
      <MentalHealthModuleFooter
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      ></MentalHealthModuleFooter>
    </div>
  );
};

export default MentalHealthPage2;
