import { useEffect, useState } from 'react';


const CountDown = (props) => {

    const SEC = 0;
    const MIN = 5;
    const TIME = MIN * 60 + SEC;

    const [count, setCount] = useState(TIME);

    useEffect(() => {
        if (count === 0) {
            props.onTimeOut();
            return;
        }
        const interval = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [count]);

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }


    return <div>
        {toHHMMSS(count)}
    </div>;
};

export default CountDown;