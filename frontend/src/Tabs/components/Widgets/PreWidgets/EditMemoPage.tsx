import React, { useEffect, useRef, useState } from 'react';
import css from './styles/editMemoPage.module.css';

import { openDB } from 'idb';

const EditMemoPage = ({ selectedPage }: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audio, setAudio] = useState<string | undefined>();

  // Assuming selectedPage is the key for the voice memo in IndexedDB
  const fetchAudioFromIndexedDB = async () => {
    try {
      const db = await openDB('VoiceMemosDB', 2); // Use the correct version number and database name

      const transaction = db.transaction('voiceMemos', 'readonly');
      const store = transaction.objectStore('voiceMemos');

      const item = await store.get(selectedPage.id);

      if (item && item.audioBlob) {
        const blob = new Blob([item.audioBlob], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);
        setAudio(audioUrl);
      }
    } catch (error) {
      console.error('Error fetching audio from IndexedDB:', error);
    }
  };

  useEffect(() => {
    fetchAudioFromIndexedDB();
  }, [selectedPage]);

  return (
    <div className={css.EditMemoPage}>
      {audio && (
        <div>
          <audio ref={audioRef} controls>
            <source src={audio} type="audio/wav" />
          </audio>
        </div>
      )}
      {/* Add your editing controls or any other content as needed */}
    </div>
  );
};

export default EditMemoPage;
