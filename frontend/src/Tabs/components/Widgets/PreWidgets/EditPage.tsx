import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import css from './styles/editPage.module.css';
import { Button, Input } from '@nextui-org/react';
import { useTheme } from '../../../hooks/useTheme';

const EditPage = ({ selectedPage, onSaveToStorage, onCloseEditPage }: any) => {
  const [content, setContent] = useState('');
  const [pageName, setPageName] = useState(selectedPage.replace("pageContent_", ""));
  const { theme } = useTheme();

  useEffect(() => {
    // Load the content of the selected page from storage when the component mounts
    chrome.storage.sync.get(selectedPage, (result) => {
      setContent(result[selectedPage]);
    });
  }, [selectedPage]);

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
    // Update the content of the selected page in storage
    chrome.storage.sync.remove(selectedPage);

    const newStorageKey = `pageContent_${pageName}`;
    chrome.storage.sync.set({ [newStorageKey]: content }, () => {
      console.log('Content and Page Name updated in Chrome Storage:', newStorageKey);
      onSaveToStorage(newStorageKey); // Notify the parent component about the updated content
      onCloseEditPage(); // Close the EditPage modal
    });
  };

  return (
    <div>
      <div>
        <Input
          className={css.Input}
          key={"pageName"}
          type='string'
          value={pageName}
          onValueChange={(value) => setPageName(value)} // Update the local state of pageName
          color={theme === "dark" ? "warning" : "primary"}
          label='Page Name'
          placeholder='Enter your page name'
        />
      </div>
      <div>
        <ReactQuill
          className={css.EditQuill}
          value={content}
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

export default EditPage;
