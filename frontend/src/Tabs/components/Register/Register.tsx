import React, { useState } from 'react';

import css from './styles/main.module.css'
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className={css.Father}>
            <div className={css.InputContainer}>
                <div>
                    <p className={css.PasswordLabel}>Enter new password:</p>
                    <input type="password" className={css.Input}/>
                </div>
            </div>
            <br />
            <div className={css.InputContainer}>
                <div>
                    <p className={css.PasswordLabel}>Retype new password:</p>
                    <input type="password" className={css.Input}/>
                </div>
            </div>
            <div className={css.Buttons}>
                <div className={css.MainButton}>
                    <Link to='/main' className={css.Button}>Confirm</Link>
                </div>
                <div className={css.MainButton}>
                    <Link to='/main' className={css.Skip}>Skip</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;