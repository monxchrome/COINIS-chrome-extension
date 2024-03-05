import React from "react";
import css from "./styles/chatgpt.module.css";

const ChatGPT = () => {
  return (
    <div className={css.Main}>
      <iframe
        title="ChatGPT"
        src="https://www.blackbox.ai/"
        className={css.Frame}
      />
    </div>
  );
};

export default ChatGPT;
