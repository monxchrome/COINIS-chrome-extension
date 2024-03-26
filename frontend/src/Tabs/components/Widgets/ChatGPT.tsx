import React, { useRef } from "react";
import css from "./styles/chatgpt.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useSwitchContext } from "../../../Contexts/SwitchContext";
import { useMouseContext } from "../../../Contexts/MouseContext";
import useClickOutside from "../../../hoc/useClickOutside";

const ChatGPT = () => {
  const {
    showCloseButton,
    setShowCloseButton,
    handleMouseDown,
    handleMouseUp,
  } = useMouseContext();
  const { handleSwitchChange } = useSwitchContext();
  const chatGPTRef = useRef(null);

  const onDelete = () => {
    handleSwitchChange("ChatGPT");
  };

  useClickOutside(chatGPTRef, () => setShowCloseButton(false));

  return (
    <div
      className={`${css.Main} ${showCloseButton ? css.Shake : ""}`}
      ref={chatGPTRef}
    >
      {showCloseButton && (
        <div className={`${css.CloseButton}`} onClick={onDelete}>
          <FontAwesomeIcon icon={faMinus} />
        </div>
      )}
      <iframe
        title="ChatGPT"
        src="https://www.blackbox.ai/"
        className={css.Frame}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default ChatGPT;
