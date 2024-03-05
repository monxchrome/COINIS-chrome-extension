import React, { useState } from "react";
import { openDB } from "idb";

import css from "./styles/photoPage.module.css";

const PhotoPage = () => {
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const db = await openDB("photosDB", 3, {
          upgrade(db) {
            db.createObjectStore("photos", {
              keyPath: "id",
              autoIncrement: true,
            });
          },
        });

        const transaction = db.transaction("photos", "readwrite");
        const store = transaction.objectStore("photos");

        const id = await store.add({ data: reader.result });
        console.log(`Photo added with ID: ${id}`);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className={css.Main}>
        <label htmlFor="dropzone-file" className={css.Drop}>
          <div className={css.Mother}>
            <svg
              className={css.First}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={css.Path}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className={css.Text}>
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-white">WAV, MP4, MP3, WEBM, AVI</p>
          </div>
          <input
            onChange={handleFileChange}
            accept=".png, .jpg, .jpeg, .gif, .tiff"
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>
      {photo && <img src={photo} alt="Uploaded" />}
    </div>
  );
};

export default PhotoPage;
