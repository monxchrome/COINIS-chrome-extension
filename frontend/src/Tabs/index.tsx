import React from 'react';
import { createRoot } from 'react-dom/client';
import Tabs from './Tabs';
import { HashRouter as Router } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '../Contexts/AuthContext';
import { SwitchProvider } from '../Contexts/SwitchContext';
import { MouseProvider } from '../Contexts/MouseContext';


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
                    <MouseProvider>
                        <Tabs/>
                    </MouseProvider>
                </SwitchProvider>
            </AuthProvider>
        </Router>
    </NextUIProvider>
    )
};

init();