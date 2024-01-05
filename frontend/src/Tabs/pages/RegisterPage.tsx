import React from "react";
import Clock from "../components/Register/Clock";
import Register from "../components/Register/Register";

import css from "./styles/register.module.css";
import { useAuth } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const { isLoggedIn, logout } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={'/main'} />
  }
  
  return (
    <div className={css.Main}>
      <Clock />
      <Register />
    </div>
  );
};

export default RegisterPage;
