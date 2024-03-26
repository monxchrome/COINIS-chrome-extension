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
    const timestamp = Date.now();
    const storageKey = `pageContent_${pageName}`;
  
    // Получить текущее содержимое хранилища
    chrome.storage.sync.get({ storageObjectKey: {} }, (result) => {
      const currentData = result.storageObjectKey;
  
      // Создать новый объект
      const newData = {
        id: timestamp,
        pageName: pageName,
        content: content
      };
  
      // Объединить текущий объект с новым объектом
      const updatedData = { ...currentData, [storageKey]: newData };
  
      // Сохранить обновленный объект в хранилище
      chrome.storage.sync.set({ storageObjectKey: updatedData }, () => {
        console.log('Content saved to Chrome Storage as an object with Key:', storageKey);
        onSaveToStorage(storageKey);
      });
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
