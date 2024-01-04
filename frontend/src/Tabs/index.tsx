import React from 'react';
import { createRoot } from 'react-dom/client';
import Tabs from './Tabs';
import { HashRouter as Router } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';


function init() {
    const appContainer = document.createElement('div')
    document.body.appendChild(appContainer)
    if(!appContainer) {
        throw new Error("Cannot find app container.")
    }
    const root = createRoot(appContainer)
    root.render(<NextUIProvider><Router><Tabs/></Router></NextUIProvider>)
};

init();