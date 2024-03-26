import React from "react";
import PagesList from "./PagesList";
import Notes from "./Notes/Notes";
import Memos from "./Memo/Memos";
import Shorts from "./Shorts/Shorts";
import Photos from "./Photos/Photos";

import css from "./styles/pages.module.css";

const Pages = ({
  components,
  setPages,
  setPage,
  setComponents,
  setVoiceMemoPage,
  setShortPage,
  setPhotoPage,
  pages,
  onSelectNote,
  onSelectShort,
  onSelectPhoto
}: any) => {
  return (
    <div>
      {pages && (
        <div>
          {components ? (
            <PagesList
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
                <Notes
                  setPages={setPages}
                  onSelectNote={onSelectNote}
                 />
              </div>
              <div>
                <Memos />
              </div>
              <div className={css.ScrollableTable}>
                <Shorts
                  setPages={setPages}
                  onSelectShort={onSelectShort}
                 />
              </div>
              <div className={css.ScrollableTable}>
                <Photos
                  setPages={setPages}
                  onSelectPhoto={onSelectPhoto}
                 />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pages;
