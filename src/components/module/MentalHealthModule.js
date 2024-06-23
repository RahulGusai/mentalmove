import React, { useState } from 'react';
import MentalHealthModulePage from '../module-pages/MentalHealthPage1';

const MentalHealthModule = (props) => {
  const { loggedIn, setLocale, module } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <MentalHealthModulePage
      loggedIn={loggedIn}
      setLocale={setLocale}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      moduleTitle={module.attributes.title}
      data={module.attributes.module_pages.data[currentIndex].attributes}
    ></MentalHealthModulePage>
  );
};
export default MentalHealthModule;
