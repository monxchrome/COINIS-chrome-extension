import React from "react";
import NewPage from "../NewPage";
import PhotoPage from "../PhotoPage";
import ShortPage from "../ShortPage";
import VoiceMemoPage from "../VoiceMemoPage";

const CreatePages = ({page, pageName, handleInputChange, handleSavePage, voiceMemoPage, shortPage, photoPage, handleModalClose, setPages, setVoiceMemoPage, setShortPage, setPhotoPage}: any) => {
  return (
    <div>
      {page && (
        <div>
          <NewPage
          handleModalClose={handleModalClose}
          setPages={setPages}
            pageName={pageName}
            handleInputChange={handleInputChange}
            onSaveToStorage={handleSavePage}
          />
        </div>
      )}
      {voiceMemoPage && (
        <div>
          <VoiceMemoPage
            setVoiceMemoPage={setVoiceMemoPage}
            handleInputChange={handleInputChange}
            pageName={pageName}
            onSaveToStorage={handleSavePage}
            handleModalClose={handleModalClose}
          />
        </div>
      )}
      {shortPage && (
        <div>
          <ShortPage
          setShortPage={setShortPage}
          handleModalClose={handleModalClose}
            handleInputChange={handleInputChange}
            pageName={pageName}
          />
        </div>
      )}
      {photoPage && (
        <div>
          <PhotoPage handleModalClose={handleModalClose} setPhotoPage={setPhotoPage} />
        </div>
      )}
    </div>
  );
};

export default CreatePages;
