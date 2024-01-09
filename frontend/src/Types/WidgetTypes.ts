export type SwitchStates = {
    Music: boolean;
    Search: boolean;
    SpeedDial: boolean;
    DarkMode: boolean;
    Notebook: boolean;
    ChatGPT: boolean;
    Clock: boolean;
    TimerTracker: boolean;
    Games: boolean;
    Grammarly: boolean;
    Shortcuts: boolean;
    AdBlocker: boolean;
    VPN: boolean;
    Podcasts: boolean;
    News: boolean;
    Weather: boolean;
    Kanban: boolean;
    PasswordGenerator: boolean;
    InternetSpeedTester: boolean;
    Translate: boolean;
};

export type SwitchContextType = {
  switchStates: SwitchStates;
  handleSwitchChange: (label: keyof SwitchStates) => void;
};

export type SwitchItem = {
  label: keyof SwitchStates;
};