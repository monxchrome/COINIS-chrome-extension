import React from 'react';
import css from './styles/style.module.css'
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className={css.Container}>
            <h1 className={css.Text}>Welkom!</h1>
            <Link to='/languages' className={css.Button}>Next</Link>
        </div>
    );
};

export default Welcome;