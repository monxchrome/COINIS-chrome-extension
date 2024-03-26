import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import css from "./styles/shortdetails.module.css";
import { Button, Input } from "@nextui-org/react";
import { useTheme } from "../../../../../hooks/useTheme";

const EditShortPage = ({
  onSaveToStorage,
  onCloseEditPage,
  selectedShort
}: any) => {
  const { content, pageName } = selectedShort;
  const [topic, setTopic] = useState(pageName);
  const [description, setDescription] = useState(content);
  const { theme } = useTheme();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
      [{ border: "none" }],
      [{ table: [] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "color",
    "background",
    "align",
    "table",
  ];

  const handleChange = (value: any) => {
    setDescription(value);
  };

  const handleSaveToStorage = () => {
    chrome.storage.sync.get('storageObjectShortKey', function(data) {
      const storageObject = data.storageObjectShortKey || {};
      // Удаляем предыдущую заметку
      delete storageObject[`shortContent_${pageName}`];
      const updatedStorageObject = {
        ...storageObject,
        [`shortContent_${topic}`]: {
          content: description,
          id: Date.now(), // Generate unique ID or use existing one if needed
          pageName: topic,
        },
      };
      chrome.storage.sync.set({ storageObjectShortKey: updatedStorageObject }, function() {
        console.log('Data successfully saved');
        onSaveToStorage(updatedStorageObject);
      });
    });
  };

  return (
    <div>
      <div>
        <ReactQuill
          className={css.NewQuill}
          value={description}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          theme="snow"
        />
        <div className={css.Button}>
          <Button
            variant="flat"
            color={theme === "dark" ? "warning" : "primary"}
            onClick={handleSaveToStorage}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditShortPage;
