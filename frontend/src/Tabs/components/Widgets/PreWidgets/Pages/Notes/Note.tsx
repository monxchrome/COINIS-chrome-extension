import React, { useRef } from "react";

import pageIcon from "../../../../../../assets/resources/page.svg";

import css from "./styles/note.module.css";
import chromeStorageService from "../../../../../services/chromeStorageService";
import { useMouseContext } from "../../../../../../Contexts/MouseContext";
import useClickOutside from "../../../../../../hoc/useClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import useAnimation from "../../../../../hooks/useAnimation";
import { motion } from "framer-motion";

const Note = ({ pages, onSelectNote, setPages, onDeleteNote }: any) => {
  const { pageName } = pages;
  const { showCloseButton, setShowCloseButton, handleMouseDown, handleMouseUp } = useMouseContext();
  const { showAnimation, hideAnimation, isVisible, setIsVisible } = useAnimation(true);
  const noteRef = useRef(null);

  const sanitizeHtml = (htmlString: any) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const sanitizedContent = sanitizeHtml(pageName);

  const handleClick = () => {
    if (showCloseButton) {
      return; // Если showCloseButton === true, просто завершаем функцию
    }

    if (onSelectNote) {
      setPages(false);
      onSelectNote(pages);
    }
  };

  const onDelete = () => {
    setIsVisible(false);
    
    setTimeout(() => {
      chromeStorageService
      .deleteNote(pageName)
      .then(() => {
        console.log("Successfully deleted note");
        onDeleteNote();
      })
      .catch((error: any) => {
        console.log("CHROME STORAGE SERVICE ERROR: ", error);
      });
    }, 1000)
  };

    useClickOutside(noteRef, () => setShowCloseButton(false));

  return (
    <motion.div
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    initial={hideAnimation}
    animate={isVisible ? showAnimation : hideAnimation}
    transition={{ ease: "easeOut", duration: 0.3 }}
      ref={noteRef}
      className={`${css.NoteContainer} ${showCloseButton ? css.Shake : ""}`}
    >
        { showCloseButton &&
            <motion.button className={`${css.CloseButton}`} onClick={onDelete} whileTap={{ scaleX: 0.95, scaleY: 0.95 }}>
              <FontAwesomeIcon icon={faMinus} />
            </motion.button>
        }
      <div className={css.TableCell} onClick={handleClick}>
        <img src={pageIcon} alt="" className={css.Icon} />
        <p
          className={css.Desc}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </motion.div>
  );
};

export default Note;
