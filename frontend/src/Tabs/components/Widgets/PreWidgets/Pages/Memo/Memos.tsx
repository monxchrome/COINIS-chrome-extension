import React, { useEffect, useState } from "react";
import Memo from "./Memo";
import indexedDBService from "../../../../../services/indexedDBService";

import css from './styles/memos.module.css'

const Memos = ({onSelectMemo}: any) => {
  const [memoPages, setMemoPages] = useState<{ id: any; pageName: any }[]>([]);

  const fetchMemos = async () => {
    const memos = await indexedDBService.getMemos();

    if (memos) {
      setMemoPages(memos);
    }
  };

  useEffect(() => {

    fetchMemos();
  }, []);

  const handleDeleteMemo = async () => {
    // Обновляем состояние заметок после удаления
    try {
      await fetchMemos(); // Повторно получаем данные заметок после удаления
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  return (
    <div className={css.Father}>
      {memoPages.map(memos => (
        <Memo
          key={
            //@ts-ignore
            memos.id
          }
          onSelectMemo={onSelectMemo}
          memos={memos}
          onDeleteMemo={handleDeleteMemo}
        />
      ))}
    </div>
  );
};

export default Memos;
