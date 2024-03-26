import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import css from './styles/notedetails.module.css';
import { Button, Input } from '@nextui-org/react';
import { useTheme } from '../../../../../hooks/useTheme';

const NoteDetails = ({ selectedNote, onSaveToStorage }: any) => {
  const { content, pageName } = selectedNote;
  const [topic, setTopic] = useState(pageName);
  const [description, setDescription] = useState(content);
  const { theme } = useTheme();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean'],
      [{'border': 'none'}],
      [{ 'table': [] }],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image',
    'color', 'background',
    'align',
    'table',
  ];

  const handleChange = (value: any) => {
    setDescription(value);
  };

  
const handleSaveToStorage = () => {
  chrome.storage.sync.get('storageObjectKey', function(data) {
    const storageObject = data.storageObjectKey || {};
    // Удаляем предыдущую заметку
    delete storageObject[`pageContent_${pageName}`];
    const updatedStorageObject = {
      ...storageObject,
      [`pageContent_${topic}`]: {
        content: description,
        id: Date.now(), // Generate unique ID or use existing one if needed
        pageName: topic,
      },
    };
    chrome.storage.sync.set({ storageObjectKey: updatedStorageObject }, function() {
      console.log('Data successfully saved');
      onSaveToStorage(updatedStorageObject);
    });
  });
};


  return (
    <div>
      <div>
        <Input
          className={css.Input}
          key={"pageName"}
          type='string'
          value={topic}
          onValueChange={(value) => setTopic(value)} // Update the local state of pageName
          color={theme === "dark" ? "secondary" : "primary"}
          label='Page Name'
          placeholder='Enter your page name'
        />
      </div>
      <div>
        <ReactQuill
          className={css.NewQuill}
          value={description}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          theme='snow'
        />
        <div className={css.Button}>
          <Button variant='flat' color={theme === "dark" ? "warning" : "primary"} onClick={handleSaveToStorage}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;