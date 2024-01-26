import React, { useEffect, useState } from 'react';
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { openDB } from 'idb';
import css from './styles/notebook.module.css'
import plus from '../../../assets/resources/plus-solid.svg'
import book from '../../../assets/resources/book.svg'

import newPage from '../../../assets/resources/newPage.svg'
import pageIcon from '../../../assets/resources/page.svg'
import voiceMemo from '../../../assets/resources/voiceMemo.svg'
import shortNote from '../../../assets/resources/shortNote.svg'
import photoNote from '../../../assets/resources/photoNote.svg'
import microphoneIcon from '../../../assets/resources/microphone.svg'
import NewPage from './PreWidgets/NewPage';
import EditPage from './PreWidgets/EditPage';
import VoiceMemoPage from './PreWidgets/VoiceMemoPage';
import EditMemoPage from './PreWidgets/EditMemoPage';

const Notebook = () => {
    const [components, setComponents] = useState(false);
    const [page, setPage] = useState(false);
    const [pages, setPages] = useState(true);
    const [pageName, setPageName] = useState("");
    const [savedPages, setSavedPages] = useState([]);
    const [memoPages, setMemoPages] = useState<{ id: any; pageName: any; }[]>([]);
    const [selectedMemoPage, setSelectedMemoPage] = useState<{ id: any; pageName: any; } | null>(null);
    const [selectedPage, setSelectedPage] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [voiceMemoPage, setVoiceMemoPage] = useState(false);

    const [isEditPageOpen, setIsEditPageOpen] = useState(false);

    useEffect(() => {
        // Load saved pages from local storage when the component mounts
        chrome.storage.sync.get(null, (items) => {
          const pages = Object.keys(items).filter((key) => key.startsWith("pageContent_"));
          //@ts-ignore
          setSavedPages(pages);
        });

        const getMemoPagesFromIndexedDB = async () => {
            try {
              const db = await openDB('VoiceMemosDB', 2);
          
              const transaction = db.transaction('voiceMemos', 'readonly');
              const store = transaction.objectStore('voiceMemos');
          
              const allItems = await store.getAll();
          
              // Map items to include both id and pageName
              const memoPages = allItems.map((item) => ({ id: item.id, pageName: item.pageName }));
          
              console.log(memoPages);
          
              setMemoPages(memoPages);
            } catch (error) {
              console.error('Error retrieving memo pages from IndexedDB:', error);
            }
          };          

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
    }

    const handlePageClick = () => {
        setPages(false)
        setPage(true);
        setComponents(false);
    }

    const handleMemoClick = () => {
        setVoiceMemoPage(true)
        setPages(false)
        setComponents(false)
    }

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

    const handleMemoPageClick = (memoPage: any) => {
        setSelectedMemoPage(memoPage);
        setPages(false);
        setPage(false);
        setComponents(false);
    }

    return (
        <div className={css.Main} onClick={onOpen}>
            <img src={book} alt="" className={css.Image} />
            <h1 className={css.Text}>Notebook</h1>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={css.Modal} backdrop='blur' size='2xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-white">
                                Notebook
                            </ModalHeader>
                            <ModalBody>
                                {pages && 
                                    <div>
                                        {components ? 
                                        <div className={css.Father}>
                                            <div className={css.Mother}>
                                                <img src={newPage} className={css.Img} onClick={handlePageClick} alt="" />
                                            </div>
                                            <div className={css.Mother}>
                                                <img src={voiceMemo} className={css.Img} onClick={handleMemoClick} alt="" />
                                            </div>
                                            <div className={css.Mother}>
                                                <img src={shortNote} className={css.Img} alt="" />
                                            </div>
                                            <div className={css.Mother}>
                                                <img src={photoNote} className={css.Img} alt="" />
                                            </div>
                                        </div>  :
                                            <div>
                                            {savedPages.length > 0 && (
                                                <div>
                                                    <div className={css.ScrollableTable}>
                                                        {savedPages.map((key) => (
                                                            <div className={css.TableCell} key={key} onClick={() => handleEditPageClick(key)}>
                                                                <img src={pageIcon} alt="" />
                                                                <p>{
                                                                    //@ts-ignore
                                                                    key?.replace("pageContent_", "")
                                                                }</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {memoPages.length > 0 && (
                                                <div>
                                                    <div className={css.ScrollableTable}>
                                                    {memoPages.map((memoPage) => (
                                                        <div className={css.TableCell} key={memoPage.id} onClick={() => handleMemoPageClick(memoPage)}>
                                                        <img src={microphoneIcon} alt="" />
                                                        <p>{memoPage.pageName}</p>
                                                        </div>
                                                    ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>                                        
                                        }
                                    </div>
                                }
                                {selectedPage && (
                                    <div>
                                        <EditPage 
                                        selectedPage={selectedPage} 
                                        onSaveToStorage={handleSavePage} 
                                        onCloseEditPage={onCloseEditPage}
                                         />
                                    </div>
                                 )
                                }
                                {selectedMemoPage && (
                                    <div>
                                        <EditMemoPage selectedPage={selectedMemoPage}/>
                                    </div>
                                 )
                                }
                                {page &&
                                    <div>
                                        <NewPage pageName={pageName} handleInputChange={handleInputChange} onSaveToStorage={handleSavePage} />
                                    </div>
                                }
                                {voiceMemoPage &&
                                    <div>
                                        <VoiceMemoPage handleInputChange={handleInputChange} pageName={pageName} />
                                    </div>
                                }
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
