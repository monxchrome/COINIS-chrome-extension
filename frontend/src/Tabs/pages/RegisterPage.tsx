import React from "react";
import Clock from "../components/Register/Clock";
import Register from "../components/Register/Register";

import css from "./styles/register.module.css";

const RegisterPage = () => {
  return (
    <div className={css.Main}>
      <Clock />
      <Register />
    </div>
  );
};

export default RegisterPage;
