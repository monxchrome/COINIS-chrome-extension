import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMouseContext } from "../../../../../../Contexts/MouseContext";
import css from "./styles/photo.module.css";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import indexedDBService from "../../../../../services/indexedDBService";
import { useRef } from "react";
import useClickOutside from "../../../../../../hoc/useClickOutside";
import { motion } from "framer-motion";
import useAnimation from "../../../../../hooks/useAnimation";

const Photo = ({ photos, onSelectPhoto, setPages, onDeletePhoto }: any) => {
    const { showAnimation, hideAnimation, isVisible, setIsVisible } = useAnimation(true);
  const {
    showCloseButton,
    setShowCloseButton,
    handleMouseDown,
    handleMouseUp,
  } = useMouseContext();
  const { data, id } = photos;
  const photoRef = useRef(null);

  const handleClick = () => {
    if (showCloseButton) {
      return; // Если showCloseButton === true, просто завершаем функцию
    }

    if (onSelectPhoto) {
      setPages(false);
      onSelectPhoto(photos); // Вызываем функцию onSelectNote и передаём информацию о нажатой заметке
    }
  };

  const onDelete = () => {
    setIsVisible(false);

    setTimeout(() => {
        indexedDBService
        .deletePhoto(id)
        .then(() => {
          onDeletePhoto();
          console.log("Photo has been deleted");
        })
        .catch((error: any) => {
          console.log("INDEXED DB ERROR: ", error);
        });
    }, 1000)
  };

  useClickOutside(photoRef, () => setShowCloseButton(false));

  return (
    <motion.div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      ref={photoRef}
      initial={hideAnimation}
      animate={isVisible ? showAnimation : hideAnimation}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={`${css.PhotoContainer} ${showCloseButton ? css.Shake : ""}`}
    >
      {showCloseButton && (
        <div className={`${css.CloseButton}`} onClick={onDelete}>
          <FontAwesomeIcon icon={faMinus} />
        </div>
      )}
      <img
        className={css.Photo}
        src={
          //@ts-ignore
          data
        }
        alt=""
      />
    </motion.div>
  );
};

export default Photo;
