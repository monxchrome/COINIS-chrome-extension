import React from 'react';

import css from './styles/photodetails.module.css'

const PhotoDetails = ({selectedPhoto}: any) => {
    const { data } = selectedPhoto;
    return (
        <div className={css.Father}>
            <img src={data} alt="" className={css.Image} />
        </div>
    );
};

export default PhotoDetails;