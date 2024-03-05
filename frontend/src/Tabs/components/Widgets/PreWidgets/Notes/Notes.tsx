import React, { useEffect, useState } from "react";
import Note from "./Note";

const Notes = () => {
  const [savedPages, setSavedPages] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get(null, items => {
      //@ts-ignore
      setSavedPages([items])
    });
  }, []);

  return (
    <div>
      {savedPages.map(page => (
        <Note key={
            //@ts-ignore
            page.id
        } pages={page} />
      ))}
    </div>
  );
};

export default Notes;
