// src/components/MentalHealthModule.js
import React, { useState } from 'react';
import MentalHealthPage1 from './MentalHealthPage1';
import MentalHealthPage2 from './MentalHealthPage2';
import MentalHealthPage3 from './MentalHealthPage3';
import { useLocation } from 'react-router-dom';

const MentalHealthModule = (props) => {
  const { loggedIn, locale, setLocale } = props;
  const location = useLocation();
  const { module } = location.state;

  const [currentIndex, setCurrentIndex] = useState(0);

  switch (currentIndex) {
    case 0:
      return (
        <MentalHealthPage1
          locale={locale}
          setLocale={setLocale}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          data={module.attributes.module_pages.data[0].attributes}
        ></MentalHealthPage1>
      );
    case 1:
      return (
        <MentalHealthPage2
          loggedIn={loggedIn}
          locale={locale}
          setLocale={setLocale}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthPage2>
      );
    case 2:
      return (
        <MentalHealthPage3
          locale={locale}
          setLocale={setLocale}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthPage3>
      );
    default:
      return (
        <MentalHealthPage1
          locale={locale}
          setLocale={setLocale}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthPage1>
      );
  }
};
export default MentalHealthModule;
