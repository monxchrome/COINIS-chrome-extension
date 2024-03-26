import React, { useRef } from "react";

import pageIcon from "../../../../../../assets/resources/page.svg";

import css from "./styles/note.module.css";
import chromeStorageService from "../../../../../services/chromeStorageService";
import { useMouseContext } from "../../../../../../Contexts/MouseContext";
import useClickOutside from "../../../../../../hoc/useClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const Note = ({ pages, onSelectNote, setPages, onDeleteNote }: any) => {
  const { pageName } = pages;
  const { showCloseButton, setShowCloseButton, handleMouseDown, handleMouseUp } = useMouseContext();
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
    chromeStorageService
      .deleteNote(pageName)
      .then(() => {
        console.log("Successfully deleted note");
        onDeleteNote();
      })
      .catch((error: any) => {
        console.log("CHROME STORAGE SERVICE ERROR: ", error);
      });
  };

    useClickOutside(noteRef, () => setShowCloseButton(false));

  return (
    <div
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
      ref={noteRef}
      className={`${css.NoteContainer} ${showCloseButton ? css.Shake : ""}`}
    >
        { showCloseButton &&
            <div className={`${css.CloseButton}`} onClick={onDelete}>
            <FontAwesomeIcon icon={faMinus} />
            </div>
        }
      <div className={css.TableCell} onClick={handleClick}>
        <img src={pageIcon} alt="" className={css.Icon} />
        <p
          className={css.Desc}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </div>
  );
};

export default Note;
