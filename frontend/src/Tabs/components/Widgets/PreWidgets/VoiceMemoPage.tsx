import { Button, Input } from '@nextui-org/react';
import React, { useState, useRef } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { openDB } from 'idb';

import css from './styles/voiceMemoPage.module.css'

const VoiceMemoPage = ({ handleInputChange, pageName }: any) => {
  const { theme } = useTheme();
  const [recording, setRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const toggleRecording = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/wav' });

          // Save to IndexedDB
          saveAudioToIndexedDB(blob);

          // Clear chunks for the next recording
          chunksRef.current = [];

          // Update audio element source
          const url = URL.createObjectURL(blob);
          if (audioRef.current) {
            audioRef.current.src = url;
          }
        };

      
      const saveAudioToIndexedDB = async (blob: Blob) => {
        try {
          const db = await openDB('VoiceMemosDB', 2, {
            upgrade(db) {
              db.createObjectStore('voiceMemos', { keyPath: 'id', autoIncrement: true });
            },
          });

          const transaction = db.transaction('voiceMemos', 'readwrite');
          const store = transaction.objectStore('voiceMemos');

          const id = await store.add({ audioBlob: blob, pageName });

          console.log('Voice memo saved to IndexedDB with ID:', id);
        } catch (error) {
          console.error('Error saving audio to IndexedDB:', error);
        }
      };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    }
  };

  return (
    <div className={css.Father}>
      <div>
        <Input
          key={"pageName"}
          type='string'
          value={pageName}
          onValueChange={handleInputChange}
          label='Page Name'
          color={theme === "dark" ? "warning" : "primary"}
          placeholder='Enter your page name'
        />
        <Button className={css.Button} color={theme === "dark" ? "warning" : "primary"} onClick={toggleRecording}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </Button>
        <audio className={css.Audio} ref={audioRef} controls />
      </div>
    </div>
  );
};

export default VoiceMemoPage;
