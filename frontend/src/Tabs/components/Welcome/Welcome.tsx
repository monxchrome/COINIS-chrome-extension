import React from 'react';
import css from './styles/style.module.css'
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';

const Welcome = () => {
    const { isLoggedIn, logout } = useAuth();
    console.log(isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={'/main'} />
    }
    
    return (
        <div className={css.Container}>
            <h1 className={css.Text}>Welkom!</h1>
            <Link to='/languages' className={css.Button}>Next</Link>
        </div>
    );
};

export default Welcome;