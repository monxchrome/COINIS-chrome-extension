import React, { useEffect, useState } from "react";
import Note from "./Note";
import chromeStorageService from "../../../../../services/chromeStorageService";

import css from './styles/notes.module.css'

const Notes = ({ onSelectNote, setPages }: any) => {
  const [savedPages, setSavedPages] = useState([]);

  const fetchData = async () => {
    try {
      const notes = await chromeStorageService.getNotes();
      //@ts-ignore
      const filter = notes.map(note =>
        Object.keys(note)
          .filter(key => key.startsWith("pageContent_"))
          .map(key => note[key])
      );
      setSavedPages(filter[0]);
    } catch (error) {
      console.error("Error fetching shorts:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Получаем данные заметок при монтировании компонента
  }, []);

  const handleDeleteNote = async () => {
    // Обновляем состояние заметок после удаления
    try {
      await fetchData(); // Повторно получаем данные заметок после удаления
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  return (
    <div className={css.Father}>
      {savedPages &&
        savedPages.map(page => (
          <Note
            key={
              //@ts-ignore
              page.id
            }
            pages={page}
            setPages={setPages}
            onSelectNote={onSelectNote}
            onDeleteNote={handleDeleteNote}
          />
        ))}
    </div>
  );
};

export default Notes;
