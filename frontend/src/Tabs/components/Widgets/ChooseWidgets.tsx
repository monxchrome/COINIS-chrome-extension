import React, { ReactNode, useState } from 'react';
import css from './styles/chooseWidgets.module.css'
import { Switch } from '@nextui-org/react';
import { SwitchItem } from '../../Interfaces/SwitchesInteface';

import exit from '../../../assets/resources/exit.svg'
import { Link } from 'react-router-dom';
import { useSwitchContext } from '../../../Contexts/SwitchContext';

const ChooseWidgets = () => {
    const { switchStates, handleSwitchChange } = useSwitchContext();

    const generatedSwitches = (): ReactNode[] => {
        const switchData: SwitchItem[] = [
            { label: "Music", value: "Music" },
            { label: "Search", value: "Search" },
            { label: "Speed Dial", value: "SpeedDial" },
            { label: "Dark Mode", value: "DarkMode" },
            { label: "Notebook", value: "Notebook" },
            { label: "ChatGPT", value: "ChatGPT" },
            { label: "Clock", value: "Clock" },
            { label: "Timer & Tracker", value: "TimerTracker" },
            { label: "Games", value: "Games" },
            { label: "Grammarly", value: "Grammarly" },
            { label: "Shortcuts", value: "Shortcuts" },
            { label: "AdBlocker", value: "AdBlocker" },
            { label: "VPN", value: "VPN" },
            { label: "Podcasts", value: "Podcasts" },
            { label: "News", value: "News" },
            { label: "Weather", value: "Weather" },
            { label: "Kanban", value: "Kanban" },
            { label: "Password Generator", value: "PasswordGenerator" },
            { label: "Internet Speed Tester", value: "InternetSpeedTester" },
            { label: "Translate", value: "Translate" },
        ]

        return switchData.map((switchItem, index) => (
            <Switch
                key={index}
                size="sm"
                aria-label={switchItem.label}
                style={{ margin: "5px" }}
                onChange={() => handleSwitchChange(switchItem.value)}
                checked={switchStates[switchItem.value]}
            >
                <span style={{ color: "white" }}>{switchItem.label}</span>
            </Switch>
        ))
    }
    return (
        <div className={css.Father}>
            <div className={css.Main}>
                <div className={css.LeftSwitches}>
                    {generatedSwitches().slice(0, 7)}
                </div>
                <div className={css.CenterSwitches}>
                    {generatedSwitches().slice(7, 14)}
                </div>
                <div className={css.RightSwitches}>
                    {generatedSwitches().slice(14)}
                </div>
                <Link to={'/main'}>
                    <img src={exit} alt="" />
                </Link>
            </div>
        </div>
    );
};

export default ChooseWidgets;