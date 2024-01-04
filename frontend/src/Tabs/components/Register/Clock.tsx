import React, { useState, useEffect } from 'react';

import css from './styles/clock.module.css'

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        const newTime = new Date();
        newTime.setSeconds(0);
        setCurrentTime(newTime);
      }, 60000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = currentTime.toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' }).replace(/^\w/, (c) => c.toLowerCase());;
      
    return (
        <div className={css.Main}>
            <h1 className={css.Clock}>{formattedTime}</h1>
            <p className={css.Date}>{formattedDate}</p>
        </div>
    );
};

export default Clock;