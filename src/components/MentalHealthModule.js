// src/components/MentalHealthModule.js
import React, { useState } from 'react';
import MentalHealthPage1 from './MentalHealthPage1';
import MentalHealthPage2 from './MentalHealthPage2';

const MentalHealthModule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  switch (currentIndex) {
    case 0:
      return (
        <MentalHealthPage1
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthPage1>
      );
    case 1:
      return (
        <MentalHealthPage2
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthPage2>
      );
    default:
      return (
        <MentalHealthPage1
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthPage1>
      );
  }
};
export default MentalHealthModule;
