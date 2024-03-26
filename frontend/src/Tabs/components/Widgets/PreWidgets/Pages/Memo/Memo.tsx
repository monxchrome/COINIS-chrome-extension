import React, { useEffect, useRef, useState } from "react";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import microphoneIcon from "../../../../../../assets/resources/microphone.svg";
import css from "./styles/memo.module.css";
import { useMouseContext } from "../../../../../../Contexts/MouseContext";
import indexedDBService from "../../../../../services/indexedDBService";
import useClickOutside from "../../../../../../hoc/useClickOutside";

const Memo = ({ memos, onDeleteMemo }: any) => {
  const { pageName, audioBlob, id } = memos;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const { showCloseButton, setShowCloseButton, handleMouseDown, handleMouseUp } = useMouseContext();
  const [seekbarValue, setSeekbarValue] = useState(0);
  const memoRef = useRef(null);

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

  useEffect(() => {
    const updateSeekbarInterval = setInterval(updateSeekbar, 1000);
    return () => clearInterval(updateSeekbarInterval);
  }, []);

  useEffect(() => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(
        new Blob([audioBlob], { type: "audio/wav" })
      );
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
      }
      return () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audioBlob]);

  const onDelete = () => {
    indexedDBService
      .deleteMemo(id)
      .then(() => {
        onDeleteMemo();
        console.log("Memo has been deleted");
      })
      .catch((error: any) => {
        console.log("INDEXED DB ERROR: ", error);
      });
  };

  useClickOutside(memoRef, () => setShowCloseButton(false));

  return (
    <div
      className={`${css.EditMemoPage} ${showCloseButton ? css.Shake : ""}`}
      ref={memoRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {showCloseButton && (
        <div className={`${css.CloseButton}`} onClick={onDelete}>
          <FontAwesomeIcon icon={faMinus} />
        </div>
      )}
      {audioBlob && (
        <div className={css.AudioPlayer}>
          <div className={css.Father}>
            <img src={microphoneIcon} alt="" className={css.Microphone} />
            <audio ref={audioRef} />
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
          <span className={css.Title}>{pageName}</span>
        </div>
      )}
    </div>
  );
};

export default Memo;
