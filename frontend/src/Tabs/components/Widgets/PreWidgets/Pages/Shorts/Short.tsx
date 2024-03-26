import { useRef } from 'react';
import { useMouseContext } from '../../../../../../Contexts/MouseContext';
import css from './styles/short.module.css'
import useClickOutside from '../../../../../../hoc/useClickOutside';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import chromeStorageService from '../../../../../services/chromeStorageService';

const Short = ({shorts, onSelectShort, setPages, onDeleteShort}: any) => {
    const { showCloseButton, setShowCloseButton } = useMouseContext();
    const {content, pageName} = shorts;
    const shortRef = useRef(null)

    const handleClick = () => {
        if (showCloseButton) {
            return; // Если showCloseButton === true, просто завершаем функцию
        }
        
        if (onSelectShort) {
            setPages(false)
            onSelectShort(shorts);
        }
    };

    useClickOutside(shortRef, () => setShowCloseButton(false));

    const onDelete = () => {
        chromeStorageService
          .deleteShort(pageName)
          .then(() => {
            console.log("Successfully deleted note");
            onDeleteShort();
          })
          .catch((error: any) => {
            console.log("CHROME STORAGE SERVICE ERROR: ", error);
          });
      };

    return (
        <div className={`${css.Father} ${showCloseButton ? css.Shake : ""}`} onClick={handleClick} ref={shortRef}>
            { showCloseButton &&
                <div className={`${css.CloseButton}`} onClick={onDelete}>
                    <FontAwesomeIcon icon={faMinus} />
                </div>
            }
            <div
                className={css.TableCell}
            >
                <code
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            </div>
        </div>
    );
};

export default Short;