import { Button, Input } from "@nextui-org/react";
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { faPlay, faPause, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

import microphone from "../../../../assets/resources/microphone.svg";

import css from "./styles/voiceMemoPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import indexedDBService from "../../../services/indexedDBService";

const VoiceMemoPage = ({ handleInputChange, pageName, setVoiceMemoPage, handleModalClose }: any) => {
  const { theme } = useTheme();
  const [recording, setRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

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
          indexedDBService.createMemo(blob, pageName);
          const memos = await indexedDBService.getMemos();
          setVoiceMemoPage(memos);
          handleModalClose();
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
    </div>
  );
};

export default VoiceMemoPage;
