import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import MentalHealthModuleMenu from './MentalHealthModuleMenu';
import { useNavigate } from 'react-router-dom';
// import { fetchLandingPageData, fetchModules } from '../services/api';

const LandingPage = (props) => {
  const navigate = useNavigate();
  const { modules, setLocale } = props;

  function handleModuleClick(index) {
    if (index == 0) navigate('/mental-health-module');
  }

  return (
    <div className="landing-page-container">
      <MentalHealthModuleMenu setLocale={setLocale}></MentalHealthModuleMenu>
      {modules && (
        <div className="modulesContainer">
          {modules.map((module, index) => {
            return (
              <div onClick={() => handleModuleClick(index)} className="module">
                <img
                  src={`http://localhost:1337${module.attributes.coverImage.data.attributes.url}`}
                  alt="Mindfulness"
                  className="module-image"
                />
                <div className={`module-text text-${index}`}>
                  {module.attributes.title}
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
