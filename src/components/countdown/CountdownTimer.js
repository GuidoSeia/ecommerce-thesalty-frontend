import React from 'react';
import DateTimeDisplay from './DateTimeDisplay.js';
import { useCountdown } from './useContdown.js';
import '../../styles/CountdownTimer.css'

const ExpiredNotice = () => {
    return (
        <div className="expired-notice flex justify-center items-center gap-1">
            <span>Coupon expired!!!</span>
            <p>Please wait for another coupon</p>
        </div>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds, codeCoupon }) => {
    return (
        <div className="show-counter">
            <div className='countdownContainer flex gap-2 md:gap-5'>
                <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 1} />
                <p>:</p>
                <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
                <div className='flex gap-5 justify-center items-center'>
                    <h2 className='text-center text-xs'>Coupon <br /> countdown</h2>
                    <h2 className='hidden md:block'>Use this coupon to get a discount on your purchase</h2>
                </div>
                <div className='flex justify-center bg-black p-1 rounded'>
                    <p className=' text-xs'>{codeCoupon}</p>
                </div>
            </div>

        </div>
    );
};

const CountdownTimer = ({ targetDate, couponCode }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
    
    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                codeCoupon={couponCode}
            />
        );
    }
};

export default CountdownTimer;
