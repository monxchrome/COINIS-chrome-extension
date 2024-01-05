import React, { useState } from "react";

import css from "./styles/main.module.css";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

const Register = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { login } = useAuth();

  const handleConfirm = () => {
    // Check if passwords match
    if (password1 === password2) {
      // Save the password in Chrome Storage
      chrome.storage.sync.set({ userPassword: password1 }, function () {
        console.log("Password saved");
      });

      login();

      // Redirect to the main page
      return <Navigate to={'/main'} />
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className={css.Father}>
      <div className={css.InputContainer}>
        <div>
          <p className={css.PasswordLabel}>Enter new password:</p>
          <input
            type="password"
            className={css.Input}
            onChange={e => setPassword1(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className={css.InputContainer}>
        <div>
          <p className={css.PasswordLabel}>Retype new password:</p>
          <input
            type="password"
            className={css.Input}
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
      </div>
      <div className={css.Buttons}>
        <div className={css.MainButton}>
          <Link to="/main" className={css.Button} onClick={handleConfirm}>
            Confirm
          </Link>
        </div>
        <div className={css.MainButton}>
          <Link to="/main" className={css.Skip}>
            Skip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
