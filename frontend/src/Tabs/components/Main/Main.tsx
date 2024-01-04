import React, { useState } from 'react';

import css from './styles/main.module.css'

import search from '../../../assets/resources/search.svg'
import plus from '../../../assets/resources/plus.svg'
import web from '../../../assets/resources/web.svg'
import settings from '../../../assets/resources/settings.svg'

const Main = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={css.Main}>
            <div>
            <div className={css.Search}>
            <img src={search} onClick={handleSearch} className={css.Icon} alt="" />
                    <input
                        type="text"
                        value={searchQuery}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={css.Input}
                    />
                </div>

                <div className={css.Tabs}>
                    <div className={css.Icons}>
                        <img src={plus} alt="" />
                    </div>
                    <div className={css.Icons}>
                        <img src={web} className={css.Web} alt="" />
                    </div>
                    <div className={css.Icons}>
                        <img src={settings} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;