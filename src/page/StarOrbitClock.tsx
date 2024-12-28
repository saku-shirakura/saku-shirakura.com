import {useEffect, useState} from "react";
import useInterval from "use-interval";
import {lastDayOfMonth} from "date-fns/lastDayOfMonth";
import {getDayOfYear} from "date-fns/getDayOfYear";
import {lastDayOfYear} from "date-fns/lastDayOfYear";

export const StarOrbitClock = () => {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const [dates, setDates] = useState({
        min: 0,
        hour: 0,
        day: 0,
        week: 0,
        month: 0,
        year: 0,
        ten_year: 0,
        century: 0,
        millennium: 0,
        ten_millennium: 0,
    });
    type clock_props = {
        showBg?: boolean;
        bgColor: string;
        showZeroLine?: boolean;
        zeroLineColor: string;
        orbitColor: string;
        showPlanet?: boolean;
        planetColor: string;
    };
    const [clockProps, ] = useState<clock_props>({
        showBg: true,
        bgColor: "#1a1a1a",
        showZeroLine: true,
        zeroLineColor: "#5523cc",
        orbitColor: "#230569",
        showPlanet: true,
        planetColor: "#a644c9"
    });

    const handleInterval = () => {
        const currentDates: {
            min: number,
            hour: number,
            day: number,
            week: number,
            month: number,
            year: number,
            ten_year: number,
            century: number,
            millennium: number,
            ten_millennium: number,
        } = {
            min: 0,
            hour: 0,
            day: 0,
            week: 0,
            month: 0,
            year: 0,
            ten_year: 0,
            century: 0,
            millennium: 0,
            ten_millennium: 0,
        }
        const currentDate = new Date()
        currentDates.min = currentDate.getSeconds() / 60;
        currentDates.hour = currentDate.getMinutes() / 60;
        currentDates.day = currentDate.getHours() / 24;
        currentDates.week = (currentDate.getDay() + 1) / 7
        currentDates.month = currentDate.getDate() / lastDayOfMonth(currentDate).getDate();
        currentDates.year = getDayOfYear(currentDate) / getDayOfYear(lastDayOfYear(currentDate));
        currentDates.ten_year = (currentDate.getFullYear() % 10) / 10;
        currentDates.century = (currentDate.getFullYear() % 100) / 100;
        currentDates.millennium = (currentDate.getFullYear() % 1000) / 1000;
        currentDates.ten_millennium = (currentDate.getFullYear() % 10000) / 10000;
        setDates(currentDates);
    }

    const getPathString = (sx: number, sy: number, ex: number, ey: number) => {
        return `M${sx},${sy} L${ex},${ey}`;
    }

    const getVisibility = (input?: boolean) => (input ? "visible" : "hidden");

    useInterval(handleInterval, 100);

    const getC_XY = (magnification: number, ratio_percent: number) => {
        const cx = width / 2;
        const rx = cx * magnification;
        const cy = height / 2;
        const ry = cy * magnification;
        const theta = (ratio_percent - 0.25) * 2 * Math.PI
        return {
            x: cx + rx * Math.cos(theta),
            y: cy + ry * Math.sin(theta),
        };
    }

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
                    <rect width={width} height={height} fill={clockProps.bgColor} visibility={getVisibility(clockProps.showBg)}/>
                    <path stroke={clockProps.zeroLineColor} strokeWidth="2"
                          visibility={getVisibility(clockProps.showZeroLine)}
                          d={getPathString(getC_XY(0.1, 0).x, getC_XY(0.1, 0).y, getC_XY(0.9, 0).x, getC_XY(0.9, 0).y)}/>
                    <g fill="none" strokeWidth={2} stroke={clockProps.orbitColor}>
                        {/* 1分  (60秒) */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.1} ry={(height / 2) * 0.1}/>
                        {/* 1時間  (60分) */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.175} ry={(height / 2) * 0.175}/>
                        {/* 1日  (24時間) */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.24} ry={(height / 2) * 0.24}/>
                        {/* 1週間  (7日) */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.3} ry={(height / 2) * 0.3}/>
                        {/* 1カ月  (28-31日) */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.4} ry={(height / 2) * 0.4}/>
                        {/* 1年   (12カ月) */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.5} ry={(height / 2) * 0.5}/>
                        {/* 10年  */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.6} ry={(height / 2) * 0.6}/>
                        {/* 1世紀  (100年) */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.7} ry={(height / 2) * 0.7}/>
                        {/* 1千年紀 (10世紀) */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.8} ry={(height / 2) * 0.8}/>
                        {/* 10千年紀 */}
                        <ellipse cx={width / 2} cy={height / 2} rx={(width / 2) * 0.9} ry={(height / 2) * 0.9}/>
                    </g>
                    <g fill={clockProps.planetColor} stroke={clockProps.planetColor}
                       visibility={getVisibility(clockProps.showPlanet)}>
                        {/* 1分  (60秒) 秒針 */}
                        <circle cx={getC_XY(0.1, dates.min).x} cy={getC_XY(0.1, dates.min).y} r={5}/>
                        {/* 1時間  (60分) 分針 */}
                        <circle cx={getC_XY(0.175, dates.hour).x} cy={getC_XY(0.175, dates.hour).y} r={5}/>
                        {/* 1日  (24時間) 時針 */}
                        <circle cx={getC_XY(0.24, dates.day).x} cy={getC_XY(0.24, dates.day).y} r={5}/>
                        {/* 1週間  (7日) 週針 */}
                        <circle cx={getC_XY(0.3, dates.week).x} cy={getC_XY(0.3, dates.week).y} r={5}/>
                        {/* 1カ月  (28-31日) 日針 */}
                        <circle cx={getC_XY(0.4, dates.month).x} cy={getC_XY(0.4, dates.month).y} r={5}/>
                        {/* 1年   (12カ月) 月針 */}
                        <circle cx={getC_XY(0.5, dates.year).x} cy={getC_XY(0.5, dates.year).y} r={5}/>
                        {/* 10年 年針 */}
                        <circle cx={getC_XY(0.6, dates.ten_year).x} cy={getC_XY(0.6, dates.ten_year).y} r={5}/>
                        {/* 1世紀  (100年) 十年針 */}
                        <circle cx={getC_XY(0.7, dates.century).x} cy={getC_XY(0.7, dates.century).y} r={5}/>
                        {/* 1千年紀 (10世紀) 世紀針 */}
                        <circle cx={getC_XY(0.8, dates.millennium).x} cy={getC_XY(0.8, dates.millennium).y} r={5}/>
                        {/* 10千年紀 千年紀針 */}
                        <circle cx={getC_XY(0.9, dates.ten_millennium).x} cy={getC_XY(0.9, dates.ten_millennium).y}
                                r={5}/>
                    </g>
                </svg>
            </div>
        </>
    );
}