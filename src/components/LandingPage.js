import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import MentalHealthModuleMenu from './MentalHealthModuleMenu';
import { useNavigate } from 'react-router-dom';
import { fetchLandingPageData } from '../services/api';

const LandingPage = (props) => {
  const navigate = useNavigate();
  const { setLocale } = props;
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchLandingPageData();
      setImages(data.attributes.images);
    };
    fetchData();
  }, []);

  function handleModuleClick(index) {
    if (index == 0) navigate('/mental-health-module');
    else navigate('/mental-move-survey');
  }

  return (
    <div className="landing-page-container">
      <MentalHealthModuleMenu setLocale={setLocale}></MentalHealthModuleMenu>
      {images && (
        <div className="modulesContainer">
          {images.data.map((image, index) => {
            return (
              <div onClick={() => handleModuleClick(index)} className="module">
                <img
                  src={image.attributes.URL}
                  alt="Mindfulness"
                  className="module-image"
                />
                <div className={`module-text text-${index}`}>
                  {image.attributes.Title}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
