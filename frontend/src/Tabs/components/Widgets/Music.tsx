import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import music from '../../../assets/resources/music.svg';
import css from './styles/music.module.css';

const Music = () => {
    const [showMusic, setShowMusic] = useState(false);

    const handleClick = () => {
        setShowMusic(!showMusic);
    };

    return (
        <div className={showMusic ? css.ContainerActive : css.Container}>
            {showMusic && (
                <div className={css.Main}>
                    <iframe title='player' style={{borderRadius: "12px"}} src="https://open.spotify.com/embed/artist/2yl6R1WQps70m1b4hz0pdv?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
            )}
            <img src={music} onClick={handleClick} alt="" className={css.MusicIcon} />
        </div>
    );
};

export default Music;
