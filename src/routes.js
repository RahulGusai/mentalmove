import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import MentalModuleAccess from './components/MentalModuleAccess';
import MentalHealthModule from './components/MentalHealthModule';
import LandingPage from './components/LandingPage';
import axios from 'axios';

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3001/check-login', {
          withCredentials: true,
        });
        if (response.data.loggedIn) {
          setLoggedIn({ companyCode: response.data.companyCode });
        }
      } catch (error) {
        console.error('There was an error checking the login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/access"
          element={
            loggedIn ? (
              <Navigate to="/home" />
            ) : (
              <MentalModuleAccess setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          path="/home"
          element={
            loggedIn ? (
              <LandingPage
                loggedIn={loggedIn}
                locale={locale}
                setLocale={setLocale}
              ></LandingPage>
            ) : (
              <Navigate to="/access" />
            )
          }
        ></Route>
        <Route
          path="/mental-health-module"
          element={
            loggedIn ? (
              <MentalHealthModule
                loggedIn={loggedIn}
                locale={locale}
                setLocale={setLocale}
              />
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
