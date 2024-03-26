import { useSwitchContext } from "../../../Contexts/SwitchContext";
import Search from "../Widgets/Search";

import css from "./styles/main.module.css";
import SpeedDial from "../Widgets/SpeedDial";
import Notebook from "../Widgets/Notebook";
import ChatGPT from "../Widgets/ChatGPT";

const Main = () => {
  const { switchStates } = useSwitchContext();

  return (
    <div className={css.MainContainer}>
      <div>{switchStates.Search && <Search />}</div>

      <div className={css.GPT}>{switchStates.ChatGPT && <ChatGPT />}</div>
      
      <div className={css.SpeedDialContainer}>
        {switchStates.SpeedDial && <SpeedDial />}
        <div className={css.NotebookContainer}>
          {switchStates.Notebook && <Notebook />}
        </div>
      </div>
    </div>
  );
};

export default Main;
