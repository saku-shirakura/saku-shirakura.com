import useInterval from "use-interval";
import {useEffect, useState} from "react";

const convertColor = (hue: number) => {
    const getColor = (r: number, g: number, b: number) => {
        return `#${Math.floor(r).toString(16).padStart(2, '0')}${Math.floor(g).toString(16).padStart(2, '0')}${Math.floor(b).toString(16).padStart(2, '0')}`;
    }
    hue = Math.floor(hue) % 360;
    const x = 1 - Math.abs((hue / 60) % 2 - 1);
    if (hue >= 0 && hue < 60) {
        return getColor(255, x * 255, 0);
    } else if (hue >= 60 && hue < 120) {
        return getColor(x * 255, 255, 0);
    } else if (hue >= 120 && hue < 180) {
        return getColor(0, 255, x * 255);
    } else if (hue >= 180 && hue < 240) {
        return getColor(0, x * 255, 255);
    } else if (hue >= 240 && hue < 300) {
        return getColor(x * 255, 0, 255);
    } else if (hue >= 300 && hue < 360) {
        return getColor(255, 0, x * 255);
    }
    return "";
}

const ColorClock = () => {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);

    const [seconds_percentage, setSecondsPercentage] = useState(0);
    const [minutes_percentage, setMinutesPercentage] = useState(0);
    const [hours_percentage, setHoursPercentage] = useState(0);

    const [seconds_color, setSecondsColor] = useState("");
    const [minutes_color, setMinutesColor] = useState("");
    const [hours_color, setHoursColor] = useState("");

    useInterval(() => {
        const t: Date = new Date(Date.now());
        setHoursPercentage(t.getHours() / 24);
        setMinutesPercentage(t.getMinutes() / 60);
        setSecondsPercentage(t.getSeconds() / 60);
    }, 100);

    useEffect(() => {
        setHoursColor(convertColor(hours_percentage * 360));
        setMinutesColor(convertColor(minutes_percentage * 360));
        setSecondsColor(convertColor(seconds_percentage * 360));
    }, [seconds_percentage, minutes_percentage, hours_percentage]);

    const handleResize = () => {
        const height_or_width = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
        setWidth(height_or_width * 0.7);
        setHeight(height_or_width * 0.5);
    };

    useEffect(() => {
        handleResize()
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <svg width={width} height={height}>
                    <circle cx={width / 2} cy={height / 2} r={width > height ? height * 0.4 : width * 0.4}
                            fill={hours_color} fill-opacity={0.7}/>
                    <circle cx={width / 2} cy={height / 2} r={width > height ? height * 0.3 : width * 0.3}
                            fill={minutes_color} fill-opacity={0.7}/>
                    <circle cx={width / 2} cy={height / 2} r={width > height ? height * 0.15 : width * 0.15}
                            fill={seconds_color} fill-opacity={0.7}/>
                </svg>
            </div>
        </>
    );
}

export default ColorClock;
