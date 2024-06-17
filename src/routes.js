import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import MentalModuleAccess from './components/MentalModuleAccess';
import MentalHealthModule from './components/MentalHealthModule';

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/access"
          element={
            loggedIn ? (
              <Navigate to="/mental-health-module" />
            ) : (
              <MentalModuleAccess setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          path="/mental-health-module"
          element={
            loggedIn ? (
              <MentalHealthModule loggedIn={loggedIn} />
            ) : (
              <Navigate to="/access" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/access" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
