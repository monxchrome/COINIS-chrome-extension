import React from 'react';
import { createRoot } from 'react-dom/client';
import Tabs from './Tabs';
import { HashRouter as Router } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '../Contexts/AuthContext';
import { SwitchProvider } from '../Contexts/SwitchContext';


function init() {
    const appContainer = document.createElement('div')
    document.body.appendChild(appContainer)
    if(!appContainer) {
        throw new Error("Cannot find app container.")
    }
    const root = createRoot(appContainer)
    root.render(
    <NextUIProvider>
        <Router>
            <AuthProvider>
                <SwitchProvider>
                    <Tabs/>
                </SwitchProvider>
            </AuthProvider>
        </Router>
    </NextUIProvider>
    )
};

init();