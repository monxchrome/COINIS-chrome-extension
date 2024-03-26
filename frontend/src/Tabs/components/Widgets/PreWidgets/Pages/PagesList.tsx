import React from "react";

import css from './styles/pageslist.module.css'

import newPage from "../../../../../assets/resources/newPage.svg";
import voiceMemo from "../../../../../assets/resources/voiceMemo.svg";
import shortNote from "../../../../../assets/resources/shortNote.svg";
import photoNote from "../../../../../assets/resources/photoNote.svg";

const PagesList = ({setPages, setPage, setComponents, setVoiceMemoPage, setShortPage, setPhotoPage}: any) => {
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

  return (
    <div>
      <div className={css.Father}>
        <div className={css.Mother}>
          <img
            src={newPage}
            className={css.Img}
            onClick={handlePageClick}
            alt=""
          />
        </div>
        <div className={css.Mother}>
          <img
            src={voiceMemo}
            className={css.Img}
            onClick={handleMemoClick}
            alt=""
          />
        </div>
        <div className={css.Mother}>
          <img
            src={shortNote}
            className={css.Img}
            onClick={handleShortClick}
            alt=""
          />
        </div>
        <div className={css.Mother}>
          <img
            src={photoNote}
            className={css.Img}
            onClick={handlePhotoClick}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default PagesList;
