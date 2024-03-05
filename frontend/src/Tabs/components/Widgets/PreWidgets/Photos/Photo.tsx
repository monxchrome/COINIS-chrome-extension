import React from 'react';

import css from './styles/photo.module.css'

const Photo = ({photos}: any) => {
    const {data} = photos;

    return (
        <div>
            <img
                className={css.Photo}
                src={
                        //@ts-ignore
                        data
                    }
                alt=""
            />
        </div>
    );
};

export default Photo;