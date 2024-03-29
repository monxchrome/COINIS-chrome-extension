import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import css from "./styles/notebook.module.css";
import plus from "../../../assets/resources/plus-solid.svg";
import book from "../../../assets/resources/book.svg";

import Pages from "./PreWidgets/Pages/Pages";
import CreatePages from "./PreWidgets/Pages/CreatePages";
import EditPages from "./PreWidgets/Pages/EditPages";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useSwitchContext } from "../../../Contexts/SwitchContext";
import { useMouseContext } from "../../../Contexts/MouseContext";
import useClickOutside from "../../../hoc/useClickOutside";
import useAnimation from "../../hooks/useAnimation";

const Notebook = () => {
  const { handleSwitchChange, switchStates } = useSwitchContext();
  const { showCloseButton, setShowCloseButton, handleMouseDown, handleMouseUp } = useMouseContext();
  const { showAnimation, hideAnimation, isVisible, setIsVisible } = useAnimation(switchStates.Notebook);
  const [components, setComponents] = useState(false);
  const [page, setPage] = useState(false);
  const [pages, setPages] = useState(true);
  const [pageName, setPageName] = useState("");
  const [shortPage, setShortPage] = useState(false);
  const [photoPage, setPhotoPage] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [voiceMemoPage, setVoiceMemoPage] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedShort, setSelectedShort] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showPlus, setShowPlus] = useState(true);
  const notebookRef = useRef(null);

  const onSelectNote = (selectedNote: any) => {
    console.log("Selected note:", selectedNote);
    setSelectedNote(selectedNote);
  };

  const onSelectShort = (selectedShort: any) => {
    console.log("Selected short:", selectedShort);
    setSelectedShort(selectedShort);
  };

  const onSelectPhoto = (selectedPhoto: any) => {
    console.log("Selected short:", selectedPhoto);
    setSelectedPhoto(selectedPhoto);
  };

  const handleClick = () => {
    setComponents(true);
  };

  const handleInputChange = (e: string) => {
    setPageName(e);
  };

  const handleSavePage = () => {
    chrome.storage.sync.set({ pageName });
  };

  const handleModalClose = () => {
    setComponents(false);
    setPage(false);
    setPages(true);
    setShortPage(false);
    setPhotoPage(false);
    setVoiceMemoPage(false);
    setSelectedNote(null);
    setSelectedShort(null);
    setSelectedPhoto(null);
  }

  useEffect(() => {
    if (page || components || shortPage || photoPage || voiceMemoPage || selectedNote || selectedShort || selectedPhoto) {
      setShowPlus(false)
    } else {
      setShowPlus(true)
    }
  }, [page, components, voiceMemoPage, shortPage, photoPage, voiceMemoPage, selectedNote, selectedShort, selectedPhoto])

  const onDelete = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleSwitchChange("Notebook");
    }, 1000); // Задержка в миллисекундах
  };

  useClickOutside(notebookRef, () => setShowCloseButton(false));

  return (
    <motion.div
      className={`${css.Main} ${showCloseButton ? css.Shake : ""}`} 
      onMouseUp={handleMouseUp} 
      onClick={() => {
        if (showCloseButton) {
          return;
        }
        onOpen();
      }}
      initial={hideAnimation}
      animate={isVisible ? showAnimation : hideAnimation}
      transition={{ ease: "easeOut", duration: 0.3 }}
      ref={notebookRef}>
      {showCloseButton && (
        <motion.button className={`${css.CloseButton}`} onClick={onDelete} whileTap={{ scaleX: 0.95, scaleY: 0.95 }}>
          <FontAwesomeIcon icon={faMinus} />
        </motion.button>
      )}
      <div onMouseDown={handleMouseDown} className={css.Container}>
        <img src={book} alt="" className={css.Image} />
        <h1 className={css.Text}>Notebook</h1>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleModalClose}
        className={css.Modal}
        backdrop="blur"
        size="2xl"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Notebook
              </ModalHeader>
              <ModalBody>
                <Pages   
                  pages={pages}
                  components={components}
                  setPages={setPages}
                  setPage={setPage}
                  setComponents={setComponents}
                  setVoiceMemoPage={setVoiceMemoPage}
                  setShortPage={setShortPage}
                  setPhotoPage={setPhotoPage}
                  onSelectNote={onSelectNote}
                  onSelectShort={onSelectShort}
                  onSelectPhoto={onSelectPhoto}
                />

                <EditPages 
                  selectedNote={selectedNote}
                  selectedShort={selectedShort}
                  selectedPhoto={selectedPhoto}
                />

                <CreatePages
                handleModalClose={handleModalClose}
                setPages={setPages}
                setShortPage={setShortPage}
                setPhotoPage={setPhotoPage}
                  page={page}
                  pageName={pageName}
                  handleInputChange={handleInputChange}
                  onSaveToStorage={handleSavePage}
                  setVoiceMemoPage={setVoiceMemoPage}
                  voiceMemoPage={voiceMemoPage}
                  shortPage={shortPage}
                  photoPage={photoPage}
                />
              </ModalBody>
              <ModalFooter>
                { showPlus && <img src={plus} alt="" onClick={handleClick} /> }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default Notebook;
