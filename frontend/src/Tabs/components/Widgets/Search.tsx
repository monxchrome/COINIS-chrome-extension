import React, { useState } from 'react';

import css from './styles/search.module.css'

import search from '../../../assets/resources/search.svg'

const Search = () => {
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
            </div>
        </div>
    );
};

export default Search;