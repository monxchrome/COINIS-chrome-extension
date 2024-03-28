import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useTheme } from '../../../hooks/useTheme';

import css from './styles/shortPage.module.css'
import chromeStorageService from '../../../services/chromeStorageService';

const ShortPage = ({ pageName, onSaveToStorage, handleInputChange, setShortPage, handleModalClose }: any) => {
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
        chromeStorageService.createShort(pageName, content, onSaveToStorage);
        const shorts = await chromeStorageService.getShorts();
        setShortPage(shorts)
        handleModalClose();
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

export default ShortPage;