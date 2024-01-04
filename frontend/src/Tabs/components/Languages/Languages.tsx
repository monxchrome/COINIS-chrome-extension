import React, { useState } from 'react';
import css from './styles/styles.module.css'
import { Radio, RadioGroup } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const Languages = () => {
    const [language, setLanguage] = useState('english')

    const handleLocal = () => {
        localStorage.setItem('selectedLanguage', language)
    }

    return (
        <div  className={css.Main}>
            <div className={css.List}>
                <div className={css.Choice}>
                    <h1 className={css.Font}>Choose a language:</h1>
                </div>
                <div className={css.Father}>
                    <RadioGroup color='primary' size='lg' value={language} onValueChange={setLanguage}>
                        <Radio value="english" className={css.MainRadio}>
                            <p className={css.Radio}>English</p>
                        </Radio>
                        <Radio value="french" className={css.MainRadio}>
                            <p className={css.Radio}>French</p>
                        </Radio>
                        <Radio value="spanish" className={css.MainRadio}>
                            <p className={css.Radio}>Spanish</p>
                        </Radio>
                        <Radio value="hindi" className={css.MainRadio}>
                            <p className={css.Radio}>Hindi</p>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
            <Link to='/register' className={css.Button} onClick={handleLocal}>Confirm</Link>
        </div>
    );
};

export default Languages;