import { Button } from 'semantic-ui-react';

const MentalHealthModuleFooter = (props) => {
  const { currentIndex, setCurrentIndex } = props;

  function handlePreviousBtnClick() {
    setCurrentIndex(currentIndex - 1);
  }

  function handleNextBtnClick() {
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div>
      <div
        style={{
          fontSize: '15px',
          fontWeight: 'bold',
          marginTop: '30px',
          marginBottom: '30px',
        }}
      >
        Would you like to discuss this topic ? Schedule a session with one of
        our psychologists by phone. <u>Click here</u> for more information.
      </div>
      <Button
        onClick={handlePreviousBtnClick}
        disabled={currentIndex === 0 ? true : false}
      >
        Previous
      </Button>
      <Button
        onClick={handleNextBtnClick}
        disabled={currentIndex === 5 ? true : false}
      >
        Next
      </Button>
    </div>
  );
};

export default MentalHealthModuleFooter;
