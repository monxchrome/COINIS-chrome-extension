import React, { useEffect, useState } from "react";
import Short from "./Short";
import chromeStorageService from "../../../../../services/chromeStorageService";

import css from './styles/shorts.module.css'

interface ShortPage {
  key: string;
  value: string;
}

const Shorts = ({onSelectShort, setPages}: any) => {
  const [shortPages, setShortPages] = useState<ShortPage[]>([]);

  const fetchData = async () => {
    try {
      const notes = await chromeStorageService.getShorts();
      //@ts-ignore
      const filter = notes.map(note =>
        Object.keys(note)
          .filter(key => key.startsWith("shortContent_"))
          .map(key => note[key])
      );
      console.log(filter[0]);
      //@ts-ignore
      setShortPages(filter[0]);
    } catch (error) {
      console.error("Error fetching shorts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteShort = async () => {
    // Обновляем состояние заметок после удаления
    try {
      await fetchData(); // Повторно получаем данные заметок после удаления
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  return (
    <div className={css.Father}>
      {shortPages &&
        shortPages.map(short => <Short key={short.key} shorts={short} onSelectShort={onSelectShort} setPages={setPages} onDeleteShort={handleDeleteShort} />)}
    </div>
  );
};

export default Shorts;
