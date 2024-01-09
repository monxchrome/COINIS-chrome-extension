import React from 'react';
import { Link } from 'react-router-dom';

import plus from '../../../assets/resources/plus.svg'
import web from '../../../assets/resources/web.svg'
import settings from '../../../assets/resources/settings.svg'

import css from './styles/buttons.module.css'

const Buttons = () => {
    return (
        <div className={css.Main}>
            <div className={css.Tabs}>
                <Link to={'/widgets'}>
                    <div className={css.Icons}>
                        <img src={plus} alt="" />
                    </div>
                </Link>
                <div className={css.Icons}>
                    <img src={web} className={css.Web} alt="" />
                </div>
                <div className={css.Icons}>
                    <img src={settings} alt="" />
                 </div>
            </div>
        </div>
    );
};

export default Buttons;