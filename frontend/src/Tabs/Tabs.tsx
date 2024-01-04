import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import './index.css'
import LanguagesPage from './pages/LanguagesPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';

function Tabs() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/languages" element={<LanguagesPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/main" element={<MainPage />} />
        </Routes>
    );
};

export default Tabs;