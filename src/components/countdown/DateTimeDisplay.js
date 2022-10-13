import React from 'react';
import '../../styles/CountdownTimer.css'

const DateTimeDisplay = ({ value, type, isDanger }) => {

    return (
        <div className={isDanger ? 'danger countContainer' : 'countContainer'}>
            <p className='text-center'>{value}</p>
            <span className='countSpan'>{type}</span>
        </div>
    );
};

export default DateTimeDisplay;
