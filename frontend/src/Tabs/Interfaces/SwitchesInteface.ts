import { SwitchStates } from "../../Types/WidgetTypes";

export interface SwitchItem {
    label: string;
    value: keyof SwitchStates;
}