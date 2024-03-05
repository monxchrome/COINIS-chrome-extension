import { openDB } from "idb";
import React, { useEffect, useState } from "react";
import Memo from "./Memo";

const Memos = () => {
  const [memoPages, setMemoPages] = useState<{ id: any; pageName: any }[]>([]);

  useEffect(() => {
    const getMemoPagesFromIndexedDB = async () => {
      try {
        const db = await openDB("VoiceMemosDB", 3);

        const transaction = db.transaction("voiceMemos", "readonly");
        console.log(transaction);
        const store = transaction.objectStore("voiceMemos");
        console.log(store);

        const allItems = await store.getAll();
        console.log(allItems);

        // Map items to include both id and pageName
        const memoPages = allItems.map(item => ({
          id: item.id,
          pageName: item.pageName,
        }));

        console.log(memoPages);

        setMemoPages(memoPages);
      } catch (error) {
        console.error("Error retrieving memo pages from IndexedDB:", error);
      }
    };

    getMemoPagesFromIndexedDB();
  }, []);

  return (
    <div>
      {memoPages.map(memos => (
        <Memo key={
            //@ts-ignore
            memos.id
        } memos={memos} />
      ))}
    </div>
  );
};

export default Memos;
