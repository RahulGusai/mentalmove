import React from 'react';
import './LandingPage.css';
import MentalHealthModuleMenu from './MentalHealthModuleMenu';
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {
  const { setLocale } = props;
  const navigate = useNavigate();

  const imageUrl =
    'http://localhost:1337/uploads/mental_health_awareness_366b17da63.jpg';

  function handleModuleClick() {
    navigate('/mental-health-module');
  }

  return (
    <div className="landing-page-container">
      <MentalHealthModuleMenu setLocale={setLocale}></MentalHealthModuleMenu>
      <div className="modulesContainer">
        <div onClick={handleModuleClick} className="module">
          <img src={imageUrl} alt="Mindfulness" className="module-image" />
          <div className="module-text">Mindfulness</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
