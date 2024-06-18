// src/components/MentalHealthModule.js
import React, { useEffect, useRef, useState } from 'react';
import { fetchMentalHealthPage2Data } from '../services/api';
import MentalHealthModuleFooter from './MentalHealthModuleFooter';
import MentalHealthSurvey from './MentalHealthSurvey';
import MentalHealthModuleMenu from './MentalHealthModuleMenu';
import MentalHealthModuleLinks from './MentalHealthModuleLinks';

const MentalHealthPage2 = (props) => {
  const { loggedIn, locale, setLocale, currentIndex, setCurrentIndex } = props;
  const [title, setTitle] = useState(null);
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
      const { data } = await fetchMentalHealthPage2Data(locale);
      setImage(data.attributes.image.data);
      setText(data.attributes.content.data);
      setQuestions(fetchQuestions(data.attributes.survey_form.data));
      setTitle(data.attributes.Title);
    };
    fetchData();
  }, [locale]);

  return (
    <div className="mental-health-page-container">
      <MentalHealthModuleMenu setLocale={setLocale}></MentalHealthModuleMenu>
      <div className="mental-health-page">
        <h1>Mental Health Module</h1>
        {image && (
          <div className="image">
            <img src={image.attributes.URL} alt={image.attributes.Title} />
            <span>{image.attributes.Title}</span>
          </div>
        )}
        {title && <h2>{title}</h2>}
        {text && (
          <div className="textContent">
            {text.attributes.title && <h2>{text.attributes.title}</h2>}
            {text.attributes.content.map((block) => {
              const children = block.children[0];

              let className = 'textBlock';
              className = children.bold ? `${className} bold` : className;
              className = children.italic ? `${className} italic` : className;
              className = children.underline
                ? `${className} underline`
                : className;

              if (children.type == 'heading')
                return <h3 className={className}>{children.text}</h3>;
              else return <div className={className}>{children.text}</div>;
            })}
          </div>
        )}
        {questions && (
          <MentalHealthSurvey
            locale={locale}
            loggedIn={loggedIn}
            questions={questions}
          ></MentalHealthSurvey>
        )}
        <MentalHealthModuleFooter
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthModuleFooter>
      </div>
      <MentalHealthModuleLinks
        setCurrentIndex={setCurrentIndex}
      ></MentalHealthModuleLinks>
    </div>
  );
};

export default MentalHealthPage2;
