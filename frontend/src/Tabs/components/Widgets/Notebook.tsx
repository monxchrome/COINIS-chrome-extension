import React, { useState } from 'react';
import css from './styles/notebook.module.css'
import plus from '../../../assets/resources/plus-solid.svg'
import book from '../../../assets/resources/book.svg'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, divider, useDisclosure } from '@nextui-org/react';

import newPage from '../../../assets/resources/newPage.svg'
import voiceMemo from '../../../assets/resources/voiceMemo.svg'
import shortNote from '../../../assets/resources/shortNote.svg'
import photoNote from '../../../assets/resources/photoNote.svg'

const Notebook = () => {
    const [components, setComponents] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleClick = () => {
        setComponents(true)
    }

    return (
        <div className={css.Main} onClick={onOpen}>
            <img src={book} alt="" className={css.Image} />
            <h1 className={css.Text}>Notebook</h1>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={css.Modal} backdrop='blur' size='2xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-white">Notebook</ModalHeader>
                            <ModalBody className={css.Father}>
                                {components ? 
                                <div className={css.Father}>
                                    <div className={css.Mother}>
                                        <img src={newPage} className={css.Img} alt="" />
                                    </div>
                                    <div className={css.Mother}>
                                        <img src={voiceMemo} className={css.Img} alt="" />
                                    </div>
                                    <div className={css.Mother}>
                                        <img src={shortNote} className={css.Img} alt="" />
                                    </div>
                                    <div className={css.Mother}>
                                        <img src={photoNote} className={css.Img} alt="" />
                                    </div>
                                </div> 
                                : <p className='text-white'>No notes yet</p>}
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
