import React from "react";
import Clock from "../components/Register/Clock";
import Main from "../components/Main/Main";

import css from "./styles/main.module.css";

const MainPage = () => {
  return (
    <div className={css.Main}>
      <Clock />
      <Main />
    </div>
  );
};

export default MainPage;
