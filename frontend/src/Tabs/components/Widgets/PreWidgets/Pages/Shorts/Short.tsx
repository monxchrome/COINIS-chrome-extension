import { useRef } from "react";
import { useMouseContext } from "../../../../../../Contexts/MouseContext";
import css from "./styles/short.module.css";
import useClickOutside from "../../../../../../hoc/useClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import chromeStorageService from "../../../../../services/chromeStorageService";
import { motion } from "framer-motion";
import useAnimation from "../../../../../hooks/useAnimation";

const Short = ({ shorts, onSelectShort, setPages, onDeleteShort }: any) => {
  const { showCloseButton, setShowCloseButton, handleMouseDown, handleMouseUp } = useMouseContext();
  const { showAnimation, hideAnimation, isVisible, setIsVisible } = useAnimation(true);
  const { content, pageName } = shorts;
  const shortRef = useRef(null);

  const handleClick = () => {
    if (showCloseButton) {
      return; // Если showCloseButton === true, просто завершаем функцию
    }

    if (onSelectShort) {
      setPages(false);
      onSelectShort(shorts);
    }
  };

  useClickOutside(shortRef, () => setShowCloseButton(false));

  const onDelete = () => {
    setIsVisible(false)

    setTimeout(() => {
        chromeStorageService
        .deleteShort(pageName)
        .then(() => {
          console.log("Successfully deleted note");
          onDeleteShort();
        })
        .catch((error: any) => {
          console.log("CHROME STORAGE SERVICE ERROR: ", error);
        });
    }, 1000)
  };

  return (
    <motion.div
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
      className={`${css.Father} ${showCloseButton ? css.Shake : ""}`}
      onClick={handleClick}
      ref={shortRef}
      initial={hideAnimation}
      animate={isVisible ? showAnimation : hideAnimation}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      {showCloseButton && (
        <motion.button className={`${css.CloseButton}`} onClick={onDelete} whileTap={{ scaleX: 0.95, scaleY: 0.95 }}>
          <FontAwesomeIcon icon={faMinus} />
        </motion.button>
      )}
      <div className={css.TableCell}>
        <code
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </motion.div>
  );
};

export default Short;
