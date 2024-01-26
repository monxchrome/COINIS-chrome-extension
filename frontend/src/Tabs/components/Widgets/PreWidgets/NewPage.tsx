import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import css from './styles/newPage.module.css'
import { Button, Input } from '@nextui-org/react';
import ReactQuill from 'react-quill';
import { useTheme } from '../../../hooks/useTheme';

const NewPage = ({ pageName, onSaveToStorage, handleInputChange }: any) => {
  const [content, setContent] = useState('');
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
    setContent(value);
  };

  const handleSaveToStorage = async () => {
    // Use the page name as part of the storage key
    const storageKey = `pageContent_${pageName}`;
    chrome.storage.sync.set({ [storageKey]: content }, () => {
      console.log('Content saved to Chrome Storage with Key:', storageKey);
      onSaveToStorage(storageKey); // Notify the parent component about the saved key
    });
  };

  return (
    <div>
      <Input
        className={css.Input}
        key={"pageName"}
        type='string'
        value={pageName}
        onValueChange={handleInputChange}
        color={theme === "dark" ? "warning" : "primary"}
        label='Page Name'
        placeholder='Enter your page name'
      />
        <div>
          <ReactQuill
            className={css.NewQuill}
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            theme='snow'
          />
          <div className={css.Button}>
            <Button color={theme === "dark" ? "warning" : "primary"} variant="flat" onClick={handleSaveToStorage}>Save</Button>
          </div>
      </div>
    </div>
  );
};

export default NewPage;
