// src/components/MentalHealthModule.js
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { fetchMentalHealthPage4Data } from '../services/api';
import MentalHealthModuleMenu from './MentalHealthModuleMenu';
import MentalHealthModuleFooter from './MentalHealthModuleFooter';
import MentalHealthModuleLinks from './MentalHealthModuleLinks';

const MentalHealthPage4 = (props) => {
  const { locale, setLocale, currentIndex, setCurrentIndex } = props;
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchMentalHealthPage4Data(locale);

      setText(data.attributes.content.data);
      setImage(data.attributes.image.data);
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

export default MentalHealthPage4;
