import React from "react";
import Clock from "../components/Register/Clock";
import Main from "../components/Main/Main";

import css from "./styles/main.module.css";
import { useAuth } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Buttons from "../components/Main/Buttons";
import { useSwitchContext } from "../../Contexts/SwitchContext";
import Music from "../components/Widgets/Music";
import DarkMode from "../components/Widgets/DarkMode";

const MainPage = () => {
  const { switchStates } = useSwitchContext();
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    <Navigate to={'/register'} />
  }
  
  return (
    <div className={css.Main}>
      <Clock />
      <Main />
      <Buttons />
      <div className={css.MusicContainer}>
        {switchStates.Music && <Music />}
      </div>
      <div className={css.DarkModeContainer}>
        {switchStates.DarkMode && <DarkMode />}
      </div>
    </div>
  );
};

export default MainPage;
