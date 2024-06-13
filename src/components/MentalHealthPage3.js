// src/components/MentalHealthModule.js
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { fetchMentalHealthPage3Data } from '../services/api';
import MentalHealthModuleMenu from './MentalHealthModuleMenu';
import MentalHealthModuleFooter from './MentalHealthModuleFooter';

const MentalHealthPage2 = (props) => {
  const { currentIndex, setCurrentIndex } = props;
  const [title, setTitle] = useState(null);
  const [textData, setTextData] = useState(null);
  const [image, setImage] = useState(null);
  const contentRefArr = useRef([React.createRef(), React.createRef()]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchMentalHealthPage3Data();

      setTextData(data.attributes.contents.data);
      setImage(data.attributes.image.data);
      setTitle(data.attributes.Title);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (textData) {
      console.log(contentRefArr);
      contentRefArr.current.forEach((contentRef, index) => {
        contentRef.current.innerText = textData[index].attributes.content;
      });
    }
  }, [contentRefArr, textData]);

  return (
    <div className="mental-health-page-container">
      <MentalHealthModuleMenu
        setCurrentIndex={setCurrentIndex}
      ></MentalHealthModuleMenu>
      <div className="mental-health-page">
        <h1>Mental Health Module</h1>
        {image && (
          <div className="image">
            <img src={image.attributes.URL} alt={image.attributes.Title} />
            <span>{image.attributes.Title}</span>
          </div>
        )}
        {title && <h2>{title}</h2>}
        {textData &&
          textData.map((textDataObj, index) => {
            return (
              <div className="textContent">
                {textDataObj.attributes.title && (
                  <h2>{textDataObj.attributes.title}</h2>
                )}
                <div ref={contentRefArr.current[index]}>
                  {textDataObj.attributes.content}
                </div>
              </div>
            );
          })}
        <MentalHealthModuleFooter
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthModuleFooter>
      </div>
    </div>
  );
};

export default MentalHealthPage2;
