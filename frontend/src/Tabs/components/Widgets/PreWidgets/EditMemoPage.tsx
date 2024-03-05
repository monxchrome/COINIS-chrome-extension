import React, { useEffect, useRef, useState } from "react";
import css from "./styles/editMemoPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { openDB } from "idb";

import microphone from "../../../../assets/resources/microphone.svg";

const EditMemoPage = ({ selectedPage }: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audio, setAudio] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [seekbarValue, setSeekbarValue] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeekbarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSeekbarValue = parseFloat(event.target.value);
    setSeekbarValue(newSeekbarValue);
    if (audioRef.current) {
      audioRef.current.currentTime = newSeekbarValue;
    }
  };

  const updateSeekbar = () => {
    if (audioRef.current) {
      setSeekbarValue(audioRef.current.currentTime);
    }
  };

  const fetchAudioFromIndexedDB = async () => {
    try {
      const db = await openDB("VoiceMemosDB", 3);
      const transaction = db.transaction("voiceMemos", "readonly");
      const store = transaction.objectStore("voiceMemos");
      const item = await store.get(selectedPage.id);

      if (item && item.audioBlob) {
        const blob = new Blob([item.audioBlob], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(blob);
        setAudio(audioUrl);
      }
    } catch (error) {
      console.error("Error fetching audio from IndexedDB:", error);
    }
  };

  useEffect(() => {
    fetchAudioFromIndexedDB();
  }, [selectedPage]);

  useEffect(() => {
    const updateSeekbarInterval = setInterval(updateSeekbar, 1000);
    return () => clearInterval(updateSeekbarInterval);
  }, []);

  return (
    <div className={css.EditMemoPage}>
      {audio && (
        <div className={css.AudioPlayer}>
          <div className={css.Father}>
            <img src={microphone} alt="" className={css.Microphone} />
            <audio ref={audioRef} src={audio} />
            <div className={css.Controls}>
              <button onClick={togglePlay} className={css.Img}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>
              <div className={css.Inputs}>
                <input
                  className={css.Input}
                  type="range"
                  min="0"
                  max={audioRef.current?.duration || 0}
                  step="1"
                  value={seekbarValue}
                  onChange={handleSeekbarChange}
                />
                <div className={css.Flex}>
                  <FontAwesomeIcon icon={faVolumeUp} className={css.Volume} />
                  <input
                    className={css.Input}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add your editing controls or any other content as needed */}
    </div>
  );
};

export default EditMemoPage;
