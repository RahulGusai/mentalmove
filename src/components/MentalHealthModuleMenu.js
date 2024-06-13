import './MentalHealthModuleMenu.css';

const MentalHealthModuleMenu = (props) => {
  const { setCurrentIndex } = props;
  return (
    <div className="mental-health-module-menu">
      <div className="modulePages">
        <div onClick={() => setCurrentIndex(0)}>1. What is Mindfulness ?</div>
        <div onClick={() => setCurrentIndex(1)}>2. How mindful are you?</div>
        <div onClick={() => setCurrentIndex(2)}>
          3. Getting started with mindfulness.
        </div>
        <div>4. Meditation</div>
        <div>5. Which exercises suit me ?</div>
      </div>
      <div className="langPicker">
        <h3>Languages</h3>
        <div className="langType">
          <span>Nederlands(Dutch)</span>
        </div>
        <div className="langType">
          <span>English</span>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthModuleMenu;
