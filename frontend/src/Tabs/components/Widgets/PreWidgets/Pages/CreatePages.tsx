import React from "react";
import NewPage from "../NewPage";
import PhotoPage from "../PhotoPage";
import ShortPage from "../ShortPage";
import VoiceMemoPage from "../VoiceMemoPage";

const CreatePages = ({page, pageName, handleInputChange, handleSavePage, voiceMemoPage, shortPage, photoPage}: any) => {
  return (
    <div>
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
    </div>
  );
};

export default CreatePages;
