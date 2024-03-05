import React from 'react';

import css from './styles/short.module.css'

const Short = ({shorts}: any) => {
    const {value} = shorts
    return (
        <div className={css.Father}>
            <div
                className={css.TableCell}
                // onClick={() => handleEditShortPageClick(key)}
            >
                <code
                    dangerouslySetInnerHTML={{
                        __html: value,
                    }}
                />
            </div>
        </div>
    );
};

export default Short;