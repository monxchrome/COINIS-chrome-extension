import { openDB } from 'idb';
import React, { useEffect, useState } from 'react';
import Photo from './Photo';

import css from './styles/photos.module.css'

const Photos = () => {
    const [photos, setPhotos] = useState<{ id: any; data: any }[]>([]);
    
    useEffect(() => {
        const getPhotosFromIndexedDB = async () => {
            try {
              const db = await openDB("photosDB", 3);
      
              const transaction = db.transaction("photos", "readonly");
              const store = transaction.objectStore("photos");
      
              const allItems = await store.getAll();
      
              // Map items to include both id and pageName
              const photoPages = allItems.map(item => ({
                id: item.id,
                data: item.data,
              }));
      
              setPhotos(photoPages);
            } catch (error) {
              console.error("Error retrieving memo pages from IndexedDB:", error);
            }
          };

          getPhotosFromIndexedDB();
    }, [])

    return (
        <div className={css.Box}>
            {photos.map(photo => <Photo key={photo.id} photos={photo} />)}
        </div>
    );
};

export default Photos;