import React, { useEffect, useState } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { openDB } from "idb";
import css from "./styles/notebook.module.css";
import plus from "../../../assets/resources/plus-solid.svg";
import book from "../../../assets/resources/book.svg";

import newPage from "../../../assets/resources/newPage.svg";
import voiceMemo from "../../../assets/resources/voiceMemo.svg";
import shortNote from "../../../assets/resources/shortNote.svg";
import photoNote from "../../../assets/resources/photoNote.svg";
import NewPage from "./PreWidgets/NewPage";
import EditPage from "./PreWidgets/EditPage";
import VoiceMemoPage from "./PreWidgets/VoiceMemoPage";
import EditMemoPage from "./PreWidgets/EditMemoPage";
import ShortPage from "./PreWidgets/ShortPage";
import EditShortPage from "./PreWidgets/EditShortPage";
import PhotoPage from "./PreWidgets/PhotoPage";
import Notes from "./PreWidgets/Notes/Notes";
import Memos from "./PreWidgets/Memo/Memos";
import Shorts from "./Shorts/Shorts";
import Photos from "./PreWidgets/Photos/Photos";
import Pages from "./PreWidgets/Pages/Pages";

const Notebook = () => {
  const [components, setComponents] = useState(false);
  const [page, setPage] = useState(false);
  const [pages, setPages] = useState(true);
  const [pageName, setPageName] = useState("");
  const [savedPages, setSavedPages] = useState([]);
  const [shortPages, setShortPages] = useState<any[]>([]);
  const [memoPages, setMemoPages] = useState<{ id: any; pageName: any }[]>([]);
  const [shortPage, setShortPage] = useState(false);
  const [photoPage, setPhotoPage] = useState(false);
  const [photos, setPhotos] = useState<{ id: any; data: any }[]>([]);
  const [selectedMemoPage, setSelectedMemoPage] = useState<{
    id: any;
    pageName: any;
  } | null>(null);
  const [selectedShortPage, setSelectedShortPage] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [voiceMemoPage, setVoiceMemoPage] = useState(false);

  const [isEditPageOpen, setIsEditPageOpen] = useState(false);

  useEffect(() => {
    // Load saved pages from local storage when the component mounts
    chrome.storage.sync.get(null, items => {
      const pages = Object.keys(items).filter(key =>
        key.startsWith("pageContent_")
      );
      console.log(pages);
      //@ts-ignore
      setSavedPages(pages);
    });

    chrome.storage.sync.get(null, items => {
      const shortContents: { key: string; value: string }[] = Object.entries(
        items
      )
        .filter(([key]) => key.startsWith("shortContent_"))
        .map(([key, value]) => {
          const modifiedValue = (value as string).replace(/<p>|<\/p>/g, "");
          console.log(
            `Key: ${key}, Original Value: ${value}, Modified Value: ${modifiedValue}`
          );
          return { key, value: modifiedValue };
        });
      setShortPages(shortContents);
    });

    const getMemoPagesFromIndexedDB = async () => {
      try {
        const db = await openDB("VoiceMemosDB", 3);

        const transaction = db.transaction("voiceMemos", "readonly");
        console.log(transaction);
        const store = transaction.objectStore("voiceMemos");
        console.log(store);

        const allItems = await store.getAll();
        console.log(allItems);

        // Map items to include both id and pageName
        const memoPages = allItems.map(item => ({
          id: item.id,
          pageName: item.pageName,
        }));

        console.log(memoPages);

        setMemoPages(memoPages);
      } catch (error) {
        console.error("Error retrieving memo pages from IndexedDB:", error);
      }
    };

    const getPhotosFromIndexedDB = async () => {
      try {
        const db = await openDB("photosDB", 3);

        const transaction = db.transaction("photos", "readonly");
        const store = transaction.objectStore("photos");

        const allItems = await store.getAll();

        // Map items to include both id and pageName
        const photoPages = allItems.map(item => ({
          id: item.id,
          data: item.data,
        }));

        console.log(photoPages);

        setPhotos(photoPages);
      } catch (error) {
        console.error("Error retrieving memo pages from IndexedDB:", error);
      }
    };

    getPhotosFromIndexedDB();
    getMemoPagesFromIndexedDB();
  }, []); // Run the effect only once when the component mounts

  const onOpenEditPage = () => {
    setIsEditPageOpen(true);
  };

  const onCloseEditPage = () => {
    setIsEditPageOpen(false);
  };

  const handleClick = () => {
    setComponents(true);
  };

  const handlePageClick = () => {
    setPages(false);
    setPage(true);
    setComponents(false);
  };

  const handleMemoClick = () => {
    setVoiceMemoPage(true);
    setPages(false);
    setComponents(false);
  };

  const handleShortClick = () => {
    setShortPage(true);
    setPages(false);
    setComponents(false);
  };

  const handlePhotoClick = () => {
    setPhotoPage(true);
    setPages(false);
    setComponents(false);
  };

  const handleInputChange = (e: string) => {
    setPageName(e);
  };

  const handleSavePage = () => {
    // Assuming you want to save the page name separately
    chrome.storage.sync.set({ pageName });
  };

  const handleEditPageClick = (key: any) => {
    setSelectedPage(key);
    setPages(false);
    setPage(false);
    setComponents(false);
    onOpenEditPage();
  };

  const handleEditShortPageClick = (key: any) => {
    setSelectedShortPage(key);
    setPages(false);
    setPage(false);
    setComponents(false);
  };

  const handleMemoPageClick = (memoPage: any) => {
    setSelectedMemoPage(memoPage);
    setPages(false);
    setPage(false);
    setComponents(false);
  };

  return (
    <div className={css.Main} onClick={onOpen}>
      <img src={book} alt="" className={css.Image} />
      <h1 className={css.Text}>Notebook</h1>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                {pages && (
                  <div>
                    {components ? (
                      <Pages
                        setPages={setPages}
                        setPage={setPage}
                        setComponents={setComponents}
                        setVoiceMemoPage={setVoiceMemoPage}
                        setShortPage={setShortPage}
                        setPhotoPage={setPhotoPage}
                      />
                    ) : (
                      <div className={css.Scroll}>
                          <div className={css.ScrollableTable}>
                            <Notes />
                          </div>
                          <div>
                            <Memos />
                          </div>
                          <div className={css.ScrollableTable}>
                            <Shorts />
                          </div>
                          <div className={css.ScrollableTable}>
                            <Photos />
                          </div>
                      </div>
                    )}
                  </div>
                )}
                {selectedPage && (
                  <div>
                    <EditPage
                      selectedPage={selectedPage}
                      onSaveToStorage={handleSavePage}
                      onCloseEditPage={onCloseEditPage}
                    />
                  </div>
                )}
                {selectedMemoPage && (
                  <div>
                    <EditMemoPage selectedPage={selectedMemoPage} />
                  </div>
                )}
                {selectedShortPage && (
                  <div>
                    <EditShortPage selectedPage={selectedShortPage} />
                  </div>
                )}
                {page && (
                  <div>
                    <NewPage
                      pageName={pageName}
                      handleInputChange={handleInputChange}
                      onSaveToStorage={handleSavePage}
                    />
                  </div>
                )}
                {voiceMemoPage && (
                  <div>
                    <VoiceMemoPage
                      handleInputChange={handleInputChange}
                      pageName={pageName}
                      onSaveToStorage={handleSavePage}
                    />
                  </div>
                )}
                {shortPage && (
                  <div>
                    <ShortPage
                      handleInputChange={handleInputChange}
                      pageName={pageName}
                    />
                  </div>
                )}
                {photoPage && (
                  <div>
                    <PhotoPage />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <img src={plus} alt="" onClick={handleClick} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Notebook;
