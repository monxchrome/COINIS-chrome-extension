import React from "react";
import NoteDetails from "./Notes/NoteDetails";
import ShortDetails from "./Shorts/ShortDetails";
import PhotoDetails from "./Photos/PhotoDetails";

const EditPages = ({
  selectedNote,
  handleSavePage,
  onCloseEditPage,
  selectedShort,
  selectedPhoto,
}: any) => {
  return (
    <div>
      {selectedNote && (
        <div>
          <NoteDetails
            selectedNote={selectedNote}
            onSaveToStorage={handleSavePage}
            onCloseEditPage={onCloseEditPage}
          />
        </div>
      )}
      {selectedShort && (
        <div>
          <ShortDetails selectedShort={selectedShort} />
        </div>
      )}
      {selectedPhoto && (
        <div>
          <PhotoDetails selectedPhoto={selectedPhoto} />
        </div>
      )}
    </div>
  );
};

export default EditPages;
