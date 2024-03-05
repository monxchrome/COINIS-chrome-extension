import { Button, Input } from "@nextui-org/react";
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { faPlay, faPause, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { openDB } from "idb";

import microphone from "../../../../assets/resources/microphone.svg";

import css from "./styles/voiceMemoPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VoiceMemoPage = ({ handleInputChange, pageName }: any) => {
  const { theme } = useTheme();
  const [recording, setRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [seekbarValue, setSeekbarValue] = useState(0);

  const toggleRecording = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = e => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/wav" });

          // Save to IndexedDB
          saveAudioToIndexedDB(blob);

          // Clear chunks for the next recording
          chunksRef.current = [];

          // Update audio element source
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          if (audioRef.current) {
            audioRef.current.src = url;
          }
        };

        const saveAudioToIndexedDB = async (blob: Blob) => {
          try {
            const db = await openDB("VoiceMemosDB", 3, {
              upgrade(db) {
                db.createObjectStore("voiceMemos", {
                  keyPath: "id",
                  autoIncrement: true,
                });
              },
            });

            const transaction = db.transaction("voiceMemos", "readwrite"); // Use the correct object store name here
            const store = transaction.objectStore("voiceMemos");

            const id = await store.add({ audioBlob: blob, pageName });

            console.log("Voice memo saved to IndexedDB with ID:", id);
          } catch (error) {
            console.error("Error saving audio to IndexedDB:", error);
          }
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    }
  };

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

  return (
    <div className={css.Father}>
      <div>
        <Input
          className={css.Input}
          key={"pageName"}
          type="string"
          value={pageName}
          onValueChange={handleInputChange}
          label="Page Name"
          color={theme === "dark" ? "warning" : "primary"}
          placeholder="Enter your page name"
        />
        <Button
          className={css.Button}
          color={theme === "dark" ? "warning" : "primary"}
          onClick={toggleRecording}
        >
          {recording ? "Stop Recording" : "Start Recording"}
        </Button>
      </div>
      {audioUrl && (
        <div className={css.AudioPlayer}>
          <div className={css.Mother}>
            <img src={microphone} alt="" className={css.Microphone} />
            <audio ref={audioRef} src={audioUrl} />
            <div className={css.Controls}>
              <button onClick={togglePlay}>
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
    </div>
  );
};

export default VoiceMemoPage;
