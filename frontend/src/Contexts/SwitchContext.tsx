import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { SwitchContextType, SwitchStates } from '../Types/WidgetTypes';

const SwitchContext = createContext<SwitchContextType | undefined>(undefined);

export const SwitchProvider: React.FC<{ children: ReactNode }> = ({ children }: any) => {
  const [switchStates, setSwitchStates] = useState<SwitchStates>(() => {
    const savedState = localStorage.getItem('switchStates');
    return savedState ? JSON.parse(savedState) : {
      Music: false,
      Search: false,
      SpeedDial: false,
      DarkMode: false,
      Notebook: false,
      ChatGPT: false,
      Clock: false,
      TimerTracker: false,
      Games: false,
      Grammarly: false,
      Shortcuts: false,
      AdBlocker: false,
      VPN: false,
      Podcasts: false,
      News: false,
      Weather: false,
      Kanban: false,
      PasswordGenerator: false,
      InternetSpeedTester: false,
      Translate: false
    }
  });

  useEffect(() => {
    // Save switchStates to localStorage whenever it changes
    localStorage.setItem('switchStates', JSON.stringify(switchStates));
  }, [switchStates]);

  const handleSwitchChange = (label: keyof SwitchStates) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <SwitchContext.Provider value={{ switchStates, handleSwitchChange }}>
      {children}
    </SwitchContext.Provider>
  );
};

export const useSwitchContext = (): SwitchContextType => {
    const context = useContext(SwitchContext);
    if (!context) {
      throw new Error('useSwitchContext must be used within a SwitchProvider');
    }
    return context;
  };
