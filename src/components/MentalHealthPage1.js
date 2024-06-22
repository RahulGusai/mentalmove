import React, { useEffect, useRef, useState } from 'react';
import { fetchMentalHealthPage1Data } from '../services/api';
import '../App.css';
import MentalHealthModuleFooter from './MentalHealthModuleFooter';
import MentalHealthModuleMenu from './MentalHealthModuleMenu';
import MentalHealthModuleLinks from './MentalHealthModuleLinks';

const MentalHealthPage1 = (props) => {
  const { locale, setLocale, currentIndex, setCurrentIndex, data } = props;

  // const [title, setTitle] = useState(null);
  // const [video, setVideo] = useState(null);
  // const [text, setText] = useState(null);
  // const [image, setImage] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await fetchMentalHealthPage1Data(locale);

  //     setVideo(data.attributes.video.data);
  //     setText(data.attributes.content.data);
  //     setImage(data.attributes.image.data);
  //     setTitle(data.attributes.Title);
  //   };
  //   fetchData();
  // }, [locale]);

  function fetchCoverImageURL(data) {
    const coverImageComponent = data.mediaComponents.find(
      (mediaComponent) => mediaComponent.__component === 'media.cover-image'
    );
    return `http://localhost:1337${coverImageComponent.coverImage.data.attributes.url}`;
  }

  function fetchVideoURL(data) {
    const videoComponent = data.mediaComponents.find(
      (mediaComponent) => mediaComponent.__component === 'media.video'
    );
    return videoComponent.URL;
  }

  function fetchTextBlocks(data) {
    return data.textComponents.filter(
      (textComponent) => textComponent.__component === 'content.text-block'
    );
  }

  function renderHeadings(text, level) {
    switch (level) {
      case 1:
        return <h1 className="textBlock">{text}</h1>;
      case 2:
        return <h2 className="textBlock">{text}</h2>;
      case 3:
        return <h3 className="textBlock">{text}</h3>;
      case 4:
        return <h4 className="textBlock">{text}</h4>;
      case 5:
        return <h5 className="textBlock">{text}</h5>;
    }
  }

  const textBlocks = fetchTextBlocks(data);

  return (
    <div className="mental-health-page-container">
      <MentalHealthModuleMenu setLocale={setLocale}></MentalHealthModuleMenu>
      <div className="mental-health-page">
        <h1>Mental Health Module</h1>
        <div className="image">
          <img src={fetchCoverImageURL(data)} alt="cover-image" />
        </div>
        <h2>{data.title}</h2>
        {textBlocks.map((textBlock) => {
          return (
            <div className="textContent">
              {textBlock.content.map((contentObj) => {
                const { type } = contentObj;

                if (type == 'heading') {
                  const children = contentObj.children[0];
                  return renderHeadings(children.text, contentObj.level);
                }

                if (type == 'paragraph') {
                  const children = contentObj.children[0];

                  let className = 'textBlock';
                  className = children.bold ? `${className} bold` : className;
                  className = children.italic
                    ? `${className} italic`
                    : className;
                  className = children.underline
                    ? `${className} underline`
                    : className;

                  return <div className={className}>{children.text}</div>;
                }

                if (type == 'list') {
                }
              })}
            </div>
          );
        })}
        <div className="youtubeVideo">
          <iframe
            width="560"
            height="315"
            src={fetchVideoURL(data)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <MentalHealthModuleFooter
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthModuleFooter>
      </div>
      {/* <MentalHealthModuleLinks
        setCurrentIndex={setCurrentIndex}
      ></MentalHealthModuleLinks> */}
    </div>
  );
};

export default MentalHealthPage1;
