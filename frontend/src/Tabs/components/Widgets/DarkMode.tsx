import React, { useState } from 'react';

import dark from '../../../assets/resources/dark.svg'

import light from '../../../assets/resources/light.svg'
import { useTheme } from '../../hooks/useTheme';

const DarkMode = () => {
    const {theme, setTheme} = useTheme();

    const darkTheme = () => {
        setTheme('dark')
    }

    const lightTheme = () => {
        setTheme('light')
    }

    return (
        <div onClick={theme === 'dark'? lightTheme : darkTheme}>
            <img src={theme === 'light' ? dark : light} alt="" />
        </div>
    );
};

export default DarkMode;