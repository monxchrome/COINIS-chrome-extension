import React, { useState } from 'react';
import Clock from '../components/Register/Clock';
import ChooseWidgets from '../components/Widgets/ChooseWidgets';

import css from './styles/chooseWidget.module.css'
import Buttons from '../components/Main/Buttons';

const ChooseWidgetsPage = () => {
    return (
        <div className={css.Main}>
            <Clock />
            <ChooseWidgets />
            <Buttons />
        </div>
    );
};

export default ChooseWidgetsPage;