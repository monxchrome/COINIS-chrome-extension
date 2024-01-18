import React, { useState } from 'react';
import { useSwitchContext } from '../../../Contexts/SwitchContext';
import Search from '../Widgets/Search';
import Music from '../Widgets/Music';

import css from './styles/main.module.css'
import SpeedDial from '../Widgets/SpeedDial';

const Main = () => {
    const { switchStates } = useSwitchContext();

    return (
        <div className={css.MainContainer}>
            <div>
                {switchStates.Search && <Search /> }
            </div>
            <div className={css.SpeedDialContainer}>
                {switchStates.SpeedDial && <SpeedDial />}
            </div>
        </div>
    );
};

export default Main;