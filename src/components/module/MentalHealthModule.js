import React, { useState } from 'react';
import MentalHealthPage1 from '../module-pages/MentalHealthPage1';
import MentalHealthPage2 from '../module-pages/MentalHealthPage2';
import MentalHealthPage3 from '../module-pages/MentalHealthPage3';

const MentalHealthModule = (props) => {
  const { loggedIn, setLocale, module } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  switch (currentIndex) {
    case 0:
      return (
        <MentalHealthPage1
          loggedIn={loggedIn}
          setLocale={setLocale}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          moduleTitle={module.attributes.title}
          data={module.attributes.module_pages.data[0].attributes}
        ></MentalHealthPage1>
      );
    case 1:
      return (
        <MentalHealthPage2
          loggedIn={loggedIn}
          setLocale={setLocale}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          moduleTitle={module.attributes.title}
          data={module.attributes.module_pages.data[1].attributes}
        ></MentalHealthPage2>
      );
    case 2:
      return (
        <MentalHealthPage3
          loggedIn={loggedIn}
          setLocale={setLocale}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          moduleTitle={module.attributes.title}
          data={module.attributes.module_pages.data[2].attributes}
        ></MentalHealthPage3>
      );
    default:
      return (
        <MentalHealthPage1
          setLocale={setLocale}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          moduleTitle={module.attributes.title}
          data={module.attributes.module_pages.data[0].attributes}
        ></MentalHealthPage1>
      );
  }
};
export default MentalHealthModule;
