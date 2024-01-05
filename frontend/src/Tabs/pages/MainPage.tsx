import React from "react";
import Clock from "../components/Register/Clock";
import Main from "../components/Main/Main";

import css from "./styles/main.module.css";
import { useAuth } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

const MainPage = () => {
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    <Navigate to={'/register'} />
  }
  
  return (
    <div className={css.Main}>
      <Clock />
      <Main />
    </div>
  );
};

export default MainPage;
