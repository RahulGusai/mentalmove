import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import MentalModuleAccess from './components/auth/MentalModuleAccess';
import MentalHealthModule from './components/module/MentalHealthModule';
import LandingPage from './components/home/LandingPage';
import axios from 'axios';
import MentalHealthSurveyModule from './components/MentalHealthSurveyModule';
import { fetchModules } from './services/api';

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [locale, setLocale] = useState('en');
  const [modules, setModules] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchModules(locale);
      setModules(data);
    };

    if (loggedIn) fetchData();
  }, [loggedIn, locale]);

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
              modules && (
                <LandingPage
                  loggedIn={loggedIn}
                  setLocale={setLocale}
                  modules={modules}
                ></LandingPage>
              )
            ) : (
              <Navigate to="/access" />
            )
          }
        ></Route>
        <Route
          path="/mental-health-module"
          element={
            loggedIn ? (
              modules && (
                <MentalHealthModule
                  loggedIn={loggedIn}
                  locale={locale}
                  setLocale={setLocale}
                  module={modules[0]}
                />
              )
            ) : (
              <Navigate to="/access" />
            )
          }
        />
        {/* <Route
          path="/mental-move-survey"
          element={
            loggedIn ? (
              <MentalHealthSurveyModule locale={locale} setLocale={setLocale} />
            ) : (
              <Navigate to="/access" />
            )
          }
        /> */}
        <Route path="*" element={<Navigate to="/access" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
