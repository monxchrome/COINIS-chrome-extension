import React, { useEffect, useState } from "react";
import Photo from "./Photo";

import css from "./styles/photos.module.css";
import indexedDBService from "../../../../../services/indexedDBService";

const Photos = ({onSelectPhoto, setPages}: any) => {
  const [photos, setPhotos] = useState<{ id: any; data: any }[]>([]);

  const fetchPhotos = async () => {
    const photos = await indexedDBService.getPhotos();

    if (photos) {
      setPhotos(photos);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDeletePhoto = async () => {
    // Обновляем состояние заметок после удаления
    try {
      await fetchPhotos(); // Повторно получаем данные заметок после удаления
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  return (
    <div className={css.Box}>
      {photos.map(photo => (
        <Photo key={photo.id} photos={photo} onSelectPhoto={onSelectPhoto} setPages={setPages} onDeletePhoto={handleDeletePhoto} />
      ))}
    </div>
  );
};

export default Photos;
