import React, { useEffect, useRef, useState } from 'react';
import { Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useTheme } from '../../hooks/useTheme';
import css from './styles/speedDial.module.css';
import plus from '../../../assets/resources/plus-solid.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useSwitchContext } from '../../../Contexts/SwitchContext';
import { useMouseContext } from '../../../Contexts/MouseContext';
import useClickOutside from '../../../hoc/useClickOutside';

const SpeedDial = () => {
    const { handleSwitchChange } = useSwitchContext();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { showCloseButton, setShowCloseButton, handleMouseDown, handleMouseUp } = useMouseContext();
    const { theme } = useTheme();
    const [icons, setIcons] = useState([]);
    const speedDialRef = useRef(null)
  
    const modalStyles = theme === 'dark'
      ? {
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
          base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }
      : {};
  
    const handleInput = (e:any) => {
      if (e.key === 'Enter') {
        const url = e.target.value;
        const logo = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${url}/&size=64`;
  
        // Check if the number of icons is less than 3 before adding a new one
        if (icons.length < 3) {
          const newIcons = [...icons, { url, logo }];
          chrome.storage.sync.set({ icons: newIcons }, () => {
            //@ts-ignore
            setIcons(newIcons);
          });
        }
      }
    };
  
    const handleLogoClick = (url:any) => {
        window.open(`https://${url}`, '_blank');
    };
  
    useEffect(() => {
      chrome.storage.sync.get(['icons'], (res) => {
        const storedIcons = res.icons || [];
        setIcons(storedIcons);
      });
    }, []);

    const onDelete = () => {
      handleSwitchChange('SpeedDial')
    }

    const onDeleteIcons = (indexToDelete: number) => {
      console.log('deleted');
      const updatedIcons = icons.filter((_, index) => index !== indexToDelete);
      chrome.storage.sync.set({ icons: updatedIcons }, () => {
        setIcons(updatedIcons);
      });
    };    

    useClickOutside(speedDialRef, () => setShowCloseButton(false));
  
    return (
      <div className={`${css.Main} ${showCloseButton ? css.Shake: ""}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} ref={speedDialRef}>
        {showCloseButton && (
          <div className={css.CloseButton} onClick={onDelete}>
            <FontAwesomeIcon icon={faMinus} />
          </div>
        )}
        {icons.map(({ url, logo }, index) => (
          <div key={url} className={css.IconContainer}>
            {showCloseButton && (
              <div className={css.CloseButtonInclude} onClick={() => onDeleteIcons(index)}>
                <FontAwesomeIcon icon={faMinus} />
              </div>
            )}
            <div className={css.Plus} onClick={() => handleLogoClick(url)}>
              <img src={logo} alt="" />
            </div>
          </div>
        ))}
        {icons.length < 3 && (
          <div className={css.Plus} onClick={onOpen}>
            <img src={plus} alt="" />
          </div>
        )}
  
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} classNames={modalStyles}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Add URL</ModalHeader>
                <ModalBody>
                  <div className={css.Modal}>
                    <Input
                      type="url"
                      label="Website"
                      placeholder="google.com"
                      labelPlacement="outside"
                      onKeyPress={handleInput}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">https://</span>
                        </div>
                      }
                    />
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  };
  
  export default SpeedDial;
