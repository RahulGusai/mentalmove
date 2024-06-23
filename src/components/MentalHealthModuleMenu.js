import './MentalHealthModuleMenu.css';

const MentalHealthModuleMenu = (props) => {
  const { setLocale } = props;
  return (
    <div className="mental-health-module-menu">
      <h3>Languages</h3>
      <div
        onClick={() => {
          setLocale('nl');
        }}
        className="langType"
      >
        <span>Nederlands(Dutch)</span>
      </div>
      <div onClick={() => setLocale('en')} className="langType">
        <span>English</span>
      </div>
    </div>
  );
};

export default MentalHealthModuleMenu;
