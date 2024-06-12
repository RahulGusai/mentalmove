// src/components/MentalHealthModule.js
import React, { useEffect, useRef, useState } from 'react';
import { fetchMentalHealthPage1Data } from '../services/api';
import { Button } from 'semantic-ui-react';
import '../App.css';
import MentalHealthModuleFooter from './MentalHealthModuleFooter';

const MentalHealthPage1 = (props) => {
  const { currentIndex, setCurrentIndex } = props;

  const [video, setVideo] = useState(null);
  const [text, setText] = useState(null);
  const [image, setImage] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchMentalHealthPage1Data();

      setVideo(data.attributes.video.data);
      setText(data.attributes.content.data);
      setImage(data.attributes.image.data);
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
      {video && (
        <div className="youtubeVideo">
          <iframe
            width="560"
            height="315"
            src={video.attributes.URL}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <span>{video.attributes.Title}</span>
        </div>
      )}
      <MentalHealthModuleFooter
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      ></MentalHealthModuleFooter>
    </div>
  );
};

export default MentalHealthPage1;
