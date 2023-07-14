'use client'
import { IRoot } from '@/data/store';
import { useMediaQuery } from '@mui/material';
import { ColorType, createChart } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const colors = {
    dark: {
        textColor: "rgba(255,255,255,0.6)",
        backgroundColor: "rgba(10,10,10,0.2)",
        horzLines: "rgba(255,255,255,0.1)",
        vertLines: "rgba(255,255,255,0.1)"
    },
    light: {
        textColor: "rgba(0,0,0,0.6)",
        backgroundColor: "rgba(255,255,255,0.2)",
        horzLines: "rgba(0,0,0,0.1)",
        vertLines: "rgba(0,0,0,0.1)"
    }
}

export default function Chart() {

    const ref = useRef<HTMLDivElement>()
    const themeColor = useSelector((state: IRoot) => state.config.theme);
    const systemColor = useMediaQuery('(prefers-color-scheme: dark)');
    const prefersDarkMode = themeColor == "system" ? (systemColor ? 'dark' : 'light') : themeColor;


    const [maxHeight, setMaxHeight] = useState(376)
    const [width, setWidth] = useState(0);

    const drawChart = () => {
        ref.current.innerHTML = "";
        const chart = createChart(ref.current, { 
            autoSize: true,
            grid: {
                horzLines: {
                    color: colors[prefersDarkMode].horzLines
                },
                vertLines: {
                    color: colors[prefersDarkMode].vertLines
                },
            },
            layout: {
                textColor: colors[prefersDarkMode].textColor,
                background: {
                    type: ColorType.Solid,
                    color: colors[prefersDarkMode].backgroundColor
                }
            }
        });
        const candleSeries = chart.addCandlestickSeries({
            upColor: '#48C076', 
            downColor: '#d9304e',
        });
        candleSeries.setData([
            { "time": "2018-10-19", "open": 54.62, "high": 55.50, "low": 54.52, "close": 54.90 },
            { "time": "2018-10-22", "open": 54.90, "high": 55.27, "low": 54.61, "close": 54.98 },
            { "time": "2018-10-23", "open": 54.98, "high": 57.47, "low": 56.09, "close": 57.21 },
            { "time": "2018-10-24", "open": 57.21, "high": 58.44, "low": 56.41, "close": 57.42 },
            { "time": "2018-10-25", "open": 57.42, "high": 57.63, "low": 56.17, "close": 56.43 },
            { "time": "2018-10-26", "open": 56.43, "high": 56.62, "low": 55.19, "close": 55.51 },
            { "time": "2018-10-29", "open": 55.51, "high": 57.15, "low": 55.72, "close": 56.48 },
            { "time": "2018-10-30", "open": 56.48, "high": 58.80, "low": 56.92, "close": 58.18 },
            { "time": "2018-10-31", "open": 58.18, "high": 58.32, "low": 56.76, "close": 57.09 },
            { "time": "2018-11-01", "open": 57.09, "high": 57.28, "low": 55.55, "close": 56.05 },
            { "time": "2018-11-02", "open": 56.05, "high": 57.08, "low": 55.92, "close": 56.63 },
            { "time": "2018-11-05", "open": 56.63, "high": 57.45, "low": 56.51, "close": 57.21 },
            { "time": "2018-11-06", "open": 57.21, "high": 57.35, "low": 56.65, "close": 57.21 },
            { "time": "2018-11-07", "open": 57.21, "high": 57.78, "low": 57.03, "close": 57.65 },
            { "time": "2018-11-08", "open": 57.65, "high": 58.44, "low": 57.66, "close": 58.27 },
            { "time": "2018-11-09", "open": 58.27, "high": 59.20, "low": 57.94, "close": 58.46 },
            { "time": "2018-11-12", "open": 58.46, "high": 59.40, "low": 58.54, "close": 58.72 },
            { "time": "2018-11-13", "open": 58.72, "high": 59.14, "low": 58.32, "close": 58.66 },
            { "time": "2018-11-14", "open": 58.66, "high": 59.32, "low": 58.41, "close": 58.94 },
            { "time": "2018-11-15", "open": 58.94, "high": 59.09, "low": 58.45, "close": 59.08 },
            { "time": "2018-11-16", "open": 59.08, "high": 60.39, "low": 58.91, "close": 60.21 },
            { "time": "2018-11-19", "open": 60.21, "high": 61.32, "low": 60.18, "close": 60.62 },
            { "time": "2018-11-20", "open": 60.62, "high": 61.58, "low": 60.35, "close": 61.01 },
            { "time": "2018-11-21", "open": 61.01, "high": 61.26, "low": 60.12, "close": 60.56 },
            { "time": "2018-11-23", "open": 60.56, "high": 60.76, "low": 59.83, "close": 60.30 },
            { "time": "2018-11-26", "open": 60.30, "high": 60.79, "low": 59.93, "close": 60.22 },
            { "time": "2018-11-27", "open": 60.22, "high": 60.32, "low": 59.37, "close": 59.46 },
            { "time": "2018-11-28", "open": 59.46, "high": 59.80, "low": 58.94, "close": 59.16 },
            { "time": "2018-11-29", "open": 59.16, "high": 59.40, "low": 58.71, "close": 59.08 },
            { "time": "2018-11-30", "open": 59.08, "high": 59.27, "low": 58.32, "close": 58.49 },
            { "time": "2018-12-03", "open": 58.49, "high": 59.69, "low": 58.53, "close": 59.20 },
            { "time": "2018-12-04", "open": 59.20, "high": 59.40, "low": 58.36, "close": 58.64 },
            { "time": "2018-12-06", "open": 58.64, "high": 58.99, "low": 57.67, "close": 58.29 },
            { "time": "2018-12-07", "open": 58.29, "high": 58.79, "low": 57.61, "close": 57.97 },
            { "time": "2018-12-10", "open": 57.97, "high": 58.27, "low": 56.91, "close": 57.09 },
            { "time": "2018-12-11", "open": 57.09, "high": 57.35, "low": 56.61, "close": 57.08 },
            { "time": "2018-12-12", "open": 57.08, "high": 57.36, "low": 56.40, "close": 56.58 },
            { "time": "2018-12-13", "open": 56.58, "high": 57.02, "low": 56.03, "close": 56.36 },
            { "time": "2018-12-14", "open": 56.36, "high": 56.62, "low": 55.19, "close": 55.33 },
            { "time": "2018-12-17", "open": 55.33, "high": 55.53, "low": 54.39, "close": 54.67 },
            { "time": "2018-12-18", "open": 54.67, "high": 55.56, "low": 54.39, "close": 55.09 },
            { "time": "2018-12-19", "open": 55.09, "high": 55.37, "low": 54.23, "close": 54.46 },
            { "time": "2018-12-20", "open": 54.46, "high": 54.67, "low": 53.46, "close": 53.78 },
            { "time": "2018-12-21", "open": 53.78, "high": 54.03, "low": 52.38, "close": 52.56 },
            { "time": "2018-12-24", "open": 52.56, "high": 52.73, "low": 51.64, "close": 51.94 },
            { "time": "2018-12-26", "open": 51.94, "high": 53.31, "low": 51.63, "close": 53.05 },
            { "time": "2018-12-27", "open": 53.05, "high": 53.38, "low": 52.19, "close": 52.72 },
            { "time": "2018-12-28", "open": 52.72, "high": 53.22, "low": 52.36, "close": 52.89 },
            { "time": "2018-12-31", "open": 52.89, "high": 53.29, "low": 52.41, "close": 52.83 },
            { "time": "2019-01-02", "open": 52.83, "high": 53.22, "low": 51.96, "close": 52.28 },
            { "time": "2019-01-03", "open": 52.28, "high": 52.45, "low": 51.60, "close": 51.91 },
            { "time": "2019-01-04", "open": 51.91, "high": 52.85, "low": 51.82, "close": 52.59 },
            { "time": "2019-01-07", "open": 52.59, "high": 53.27, "low": 52.38, "close": 52.96 },
            { "time": "2019-01-08", "open": 52.96, "high": 53.31, "low": 52.63, "close": 52.98 },
            { "time": "2019-01-09", "open": 52.98, "high": 54.10, "low": 52.93, "close": 53.86 },
            { "time": "2019-01-10", "open": 53.86, "high": 54.27, "low": 53.26, "close": 53.61 },
            { "time": "2019-01-11", "open": 53.61, "high": 53.75, "low": 52.91, "close": 53.05 },
            { "time": "2019-01-14", "open": 53.05, "high": 53.38, "low": 52.67, "close": 52.87 },
            { "time": "2019-01-15", "open": 52.87, "high": 53.88, "low": 52.96, "close": 53.62 },
            { "time": "2019-01-16", "open": 53.62, "high": 54.52, "low": 53.48, "close": 54.21 },
            { "time": "2019-01-17", "open": 54.21, "high": 54.55, "low": 53.65, "close": 54.11 },
            { "time": "2019-01-18", "open": 54.11, "high": 54.37, "low": 53.55, "close": 53.98 },
            { "time": "2019-01-22", "open": 53.98, "high": 54.17, "low": 52.15, "close": 52.57 },
            { "time": "2019-01-23", "open": 52.57, "high": 53.39, "low": 52.67, "close": 53.04 },
            { "time": "2019-01-24", "open": 53.04, "high": 53.43, "low": 52.59, "close": 53.12 },
            { "time": "2019-01-25", "open": 53.12, "high": 53.80, "low": 52.96, "close": 53.70 },
            { "time": "2019-01-28", "open": 53.70, "high": 53.75, "low": 52.85, "close": 53.01 },
            { "time": "2019-01-29", "open": 53.01, "high": 53.48, "low": 52.86, "close": 53.28 },
            { "time": "2019-01-30", "open": 53.28, "high": 54.20, "low": 53.25, "close": 54.00 },
            { "time": "2019-01-31", "open": 54.00, "high": 54.24, "low": 53.69, "close": 54.17 },
            { "time": "2019-02-01", "open": 54.17, "high": 55.14, "low": 54.32, "close": 55.06 },
            { "time": "2019-02-04", "open": 55.06, "high": 56.14, "low": 55.48, "close": 56.00 },
            { "time": "2019-02-05", "open": 56.00, "high": 56.56, "low": 55.78, "close": 56.17 },
            { "time": "2019-02-06", "open": 56.17, "high": 56.37, "low": 55.63, "close": 56.03 },
            { "time": "2019-02-07", "open": 56.03, "high": 56.23, "low": 55.40, "close": 55.57 },
            { "time": "2019-02-08", "open": 55.57, "high": 55.85, "low": 54.92, "close": 55.26 },
            { "time": "2019-02-11", "open": 55.26, "high": 55.53, "low": 54.67, "close": 54.85 },
            { "time": "2019-02-12", "open": 54.85, "high": 56.23, "low": 54.96, "close": 56.18 },
            { "time": "2019-02-13", "open": 56.18, "high": 56.42, "low": 55.45, "close": 55.68 },
            { "time": "2019-02-14", "open": 55.68, "high": 55.90, "low": 54.69, "close": 55.12 },
            { "time": "2019-02-15", "open": 55.12, "high": 55.76, "low": 54.67, "close": 55.63 },
            { "time": "2019-02-19", "open": 55.63, "high": 56.37, "low": 55.44, "close": 56.22 },
            { "time": "2019-02-20", "open": 56.22, "high": 56.73, "low": 56.03, "close": 56.42 },
            { "time": "2019-02-21", "open": 56.42, "high": 56.79, "low": 55.96, "close": 56.43 },
            { "time": "2019-02-22", "open": 56.43, "high": 57.13, "low": 56.40, "close": 56.95 },
            { "time": "2019-02-25", "open": 56.95, "high": 57.27, "low": 56.55, "close": 56.83 },
            { "time": "2019-02-26", "open": 56.83, "high": 57.09, "low": 56.46, "close": 56.64 },
            { "time": "2019-02-27", "open": 56.64, "high": 57.35, "low": 56.65, "close": 57.21 },
            { "time": "2019-02-28", "open": 57.21, "high": 57.49, "low": 56.72, "close": 57.02 },
            { "time": "2019-03-01", "open": 57.02, "high": 57.57, "low": 56.67, "close": 57.16 },
            { "time": "2019-03-04", "open": 57.16, "high": 57.34, "low": 55.66, "close": 55.77 },
            { "time": "2019-03-05", "open": 55.77, "high": 56.50, "low": 55.78, "close": 56.10 },
            { "time": "2019-03-06", "open": 56.10, "high": 56.56, "low": 55.78, "close": 56.22 },
            { "time": "2019-03-07", "open": 56.22, "high": 56.39, "low": 55.51, "close": 55.76 },
            { "time": "2019-03-08", "open": 55.76, "high": 56.09, "low": 55.07, "close": 55.92 },
            { "time": "2019-03-11", "open": 55.92, "high": 57.13, "low": 55.92, "close": 56.96 },
            { "time": "2019-03-12", "open": 56.96, "high": 57.39, "low": 56.75, "close": 57.10 },
            { "time": "2019-03-13", "open": 57.10, "high": 57.60, "low": 56.91, "close": 57.27 },
            { "time": "2019-03-14", "open": 57.27, "high": 57.57, "low": 56.94, "close": 57.38 },
            { "time": "2019-03-15", "open": 57.38, "high": 57.83, "low": 57.24, "close": 57.50 },
            { "time": "2019-03-18", "open": 57.50, "high": 58.20, "low": 57.42, "close": 57.85 },
            { "time": "2019-03-19", "open": 57.85, "high": 58.18, "low": 57.32, "close": 57.58 },
            { "time": "2019-03-20", "open": 57.58, "high": 58.35, "low": 57.58, "close": 58.04 },
            { "time": "2019-03-21", "open": 58.04, "high": 58.79, "low": 57.91, "close": 58.59 },
            { "time": "2019-03-22", "open": 58.59, "high": 58.72, "low": 57.45, "close": 57.50 },
            { "time": "2019-03-25", "open": 57.50, "high": 57.85, "low": 56.75, "close": 57.02 },
            { "time": "2019-03-26", "open": 57.02, "high": 57.35, "low": 56.65, "close": 57.12 },
            { "time": "2019-03-27", "open": 57.12, "high": 57.40, "low": 56.65, "close": 57.27 },
            { "time": "2019-03-28", "open": 57.27, "high": 57.57, "low": 56.94, "close": 57.40 },
            { "time": "2019-03-29", "open": 57.40, "high": 57.83, "low": 57.24, "close": 57.82 },
            { "time": "2019-04-01", "open": 57.82, "high": 58.22, "low": 57.57, "close": 58.04 },
            { "time": "2019-04-02", "open": 58.04, "high": 58.37, "low": 57.58, "close": 58.27 },
            { "time": "2019-04-03", "open": 58.27, "high": 58.85, "low": 58.01, "close": 58.43 },
            { "time": "2019-04-04", "open": 58.43, "high": 58.89, "low": 58.18, "close": 58.45 },
            { "time": "2019-04-05", "open": 58.45, "high": 58.87, "low": 58.29, "close": 58.65 },
            { "time": "2019-04-08", "open": 58.65, "high": 58.92, "low": 58.43, "close": 58.72 },
            { "time": "2019-04-09", "open": 58.72, "high": 58.97, "low": 58.33, "close": 58.38 },
            { "time": "2019-04-10", "open": 58.38, "high": 58.78, "low": 58.29, "close": 58.56 },
            { "time": "2019-04-11", "open": 58.56, "high": 58.77, "low": 58.26, "close": 58.40 },
            { "time": "2019-04-12", "open": 58.40, "high": 58.89, "low": 58.29, "close": 58.67 },
            { "time": "2019-04-15", "open": 58.67, "high": 58.99, "low": 58.46, "close": 58.71 },
            { "time": "2019-04-16", "open": 58.71, "high": 59.09, "low": 58.53, "close": 58.79 },
            { "time": "2019-04-17", "open": 58.79, "high": 59.18, "low": 58.66, "close": 58.94 },
            { "time": "2019-04-18", "open": 58.94, "high": 59.23, "low": 58.69, "close": 59.04 },
            { "time": "2019-04-22", "open": 59.04, "high": 59.31, "low": 58.67, "close": 58.96 },
            { "time": "2019-04-23", "open": 58.96, "high": 59.53, "low": 58.94, "close": 59.51 },
            { "time": "2019-04-24", "open": 59.51, "high": 59.80, "low": 59.18, "close": 59.42 },
            { "time": "2019-04-25", "open": 59.42, "high": 59.67, "low": 58.96, "close": 59.15 },
            { "time": "2019-04-26", "open": 59.15, "high": 59.47, "low": 58.92, "close": 59.34 },
            { "time": "2019-04-29", "open": 59.34, "high": 59.66, "low": 59.09, "close": 59.41 },
            { "time": "2019-04-30", "open": 59.41, "high": 59.72, "low": 59.17, "close": 59.54 },
            { "time": "2019-05-01", "open": 59.54, "high": 59.86, "low": 59.35, "close": 59.57 },
            { "time": "2019-05-02", "open": 59.57, "high": 59.81, "low": 59.18, "close": 59.43 },
            { "time": "2019-05-03", "open": 59.43, "high": 59.72, "low": 59.26, "close": 59.48 },
            { "time": "2019-05-06", "open": 59.48, "high": 59.75, "low": 59.01, "close": 59.39 },
            { "time": "2019-05-07", "open": 59.39, "high": 59.61, "low": 58.83, "close": 59.11 },
            { "time": "2019-05-08", "open": 59.11, "high": 59.37, "low": 58.68, "close": 59.05 },
            { "time": "2019-05-09", "open": 59.05, "high": 59.40, "low": 58.71, "close": 59.13 },
            { "time": "2019-05-10", "open": 59.13, "high": 59.45, "low": 58.78, "close": 59.29 },
            { "time": "2019-05-13", "open": 59.29, "high": 59.54, "low": 58.67, "close": 58.72 },
            { "time": "2019-05-14", "open": 58.72, "high": 59.13, "low": 58.32, "close": 58.66 },
            { "time": "2019-05-15", "open": 58.66, "high": 58.95, "low": 58.29, "close": 58.58 },
            { "time": "2019-05-16", "open": 58.58, "high": 58.87, "low": 58.22, "close": 58.59 },
            { "time": "2019-05-17", "open": 58.59, "high": 58.82, "low": 58.18, "close": 58.32 },
            { "time": "2019-05-20", "open": 58.32, "high": 58.59, "low": 57.91, "close": 58.09 },
            { "time": "2019-05-21", "open": 58.09, "high": 58.45, "low": 57.80, "close": 58.18 },
            { "time": "2019-05-22", "open": 58.18, "high": 58.48, "low": 57.73, "close": 57.99 },
            { "time": "2019-05-23", "open": 57.99, "high": 58.32, "low": 57.46, "close": 57.76 },
            { "time": "2019-05-24", "open": 57.76, "high": 58.09, "low": 57.45, "close": 57.72 },
            { "time": "2019-05-28", "open": 57.72, "high": 58.05, "low": 57.42, "close": 57.65 },
            { "time": "2019-05-29", "open": 57.65, "high": 57.92, "low": 57.34, "close": 57.58 },
            { "time": "2019-05-30", "open": 57.58, "high": 57.85, "low": 57.22, "close": 57.59 },
            { "time": "2019-05-31", "open": 57.59, "high": 57.83, "low": 57.00, "close": 57.24 },
            { "time": "2019-06-03", "open": 57.24, "high": 57.57, "low": 56.75, "close": 57.10 },
            { "time": "2019-06-04", "open": 57.10, "high": 57.40, "low": 56.62, "close": 57.27 },
            { "time": "2019-06-05", "open": 57.27, "high": 57.61, "low": 56.83, "close": 57.34 },
            { "time": "2019-06-06", "open": 57.34, "high": 57.64, "low": 56.93, "close": 57.46 },
            { "time": "2019-06-07", "open": 57.46, "high": 57.84, "low": 57.19, "close": 57.59 },
            { "time": "2019-06-10", "open": 57.59, "high": 58.19, "low": 57.53, "close": 57.93 },
            { "time": "2019-06-11", "open": 57.93, "high": 58.22, "low": 57.48, "close": 57.83 },
            { "time": "2019-06-12", "open": 57.83, "high": 58.16, "low": 57.44, "close": 57.76 },
            { "time": "2019-06-13", "open": 57.76, "high": 58.07, "low": 57.29, "close": 57.60 },
            { "time": "2019-06-14", "open": 57.60, "high": 57.91, "low": 57.28, "close": 57.57 },
            { "time": "2019-06-17", "open": 57.57, "high": 57.88, "low": 57.21, "close": 57.48 },
            { "time": "2019-06-18", "open": 57.48, "high": 57.83, "low": 57.18, "close": 57.66 },
            { "time": "2019-06-19", "open": 57.66, "high": 57.96, "low": 57.26, "close": 57.61 },
            { "time": "2019-06-20", "open": 57.61, "high": 58.15, "low": 57.49, "close": 57.83 },
            { "time": "2019-06-21", "open": 57.83, "high": 58.18, "low": 57.54, "close": 57.76 },
            { "time": "2019-06-24", "open": 57.76, "high": 58.09, "low": 57.45, "close": 57.70 },
            { "time": "2019-06-25", "open": 57.70, "high": 57.93, "low": 57.29, "close": 57.46 },
            { "time": "2019-06-26", "open": 57.46, "high": 57.83, "low": 57.22, "close": 57.55 },
            { "time": "2019-06-27", "open": 57.55, "high": 57.84, "low": 57.23, "close": 57.58 },
            { "time": "2019-06-28", "open": 57.58, "high": 57.92, "low": 57.28, "close": 57.43 },
            { "time": "2019-07-01", "open": 57.43, "high": 57.83, "low": 57.26, "close": 57.57 },
            { "time": "2019-07-02", "open": 57.57, "high": 57.89, "low": 57.27, "close": 57.58 },
            { "time": "2019-07-03", "open": 57.58, "high": 57.97, "low": 57.34, "close": 57.76 },
            { "time": "2019-07-05", "open": 57.76, "high": 58.11, "low": 57.44, "close": 57.82 },
            { "time": "2019-07-08", "open": 57.82, "high": 58.15, "low": 57.49, "close": 57.69 },
            { "time": "2019-07-09", "open": 57.69, "high": 58.02, "low": 57.36, "close": 57.55 },
            { "time": "2019-07-10", "open": 57.55, "high": 57.92, "low": 57.34, "close": 57.60 },
            { "time": "2019-07-11", "open": 57.60, "high": 57.97, "low": 57.39, "close": 57.67 },
            { "time": "2019-07-12", "open": 57.67, "high": 58.02, "low": 57.42, "close": 57.77 },
            { "time": "2019-07-15", "open": 57.77, "high": 58.14, "low": 57.54, "close": 57.85 },
            { "time": "2019-07-16", "open": 57.85, "high": 58.20, "low": 57.58, "close": 57.83 },
            { "time": "2019-07-17", "open": 57.83, "high": 58.18, "low": 57.55, "close": 57.76 },
            { "time": "2019-07-18", "open": 57.76, "high": 58.12, "low": 57.49, "close": 57.85 },
            { "time": "2019-07-19", "open": 57.85, "high": 58.19, "low": 57.56, "close": 57.74 },
            { "time": "2019-07-22", "open": 57.74, "high": 58.10, "low": 57.47, "close": 57.81 },
            { "time": "2019-07-23", "open": 57.81, "high": 58.16, "low": 57.52, "close": 57.83 },
            { "time": "2019-07-24", "open": 57.83, "high": 58.20, "low": 57.57, "close": 57.97 },
            { "time": "2019-07-25", "open": 57.97, "high": 58.33, "low": 57.68, "close": 58.11 },
            { "time": "2019-07-26", "open": 58.11, "high": 58.47, "low": 57.82, "close": 58.27 },
            { "time": "2019-07-29", "open": 58.27, "high": 58.64, "low": 57.98, "close": 58.33 },
            { "time": "2019-07-30", "open": 58.33, "high": 58.69, "low": 58.02, "close": 58.37 },
            { "time": "2019-07-31", "open": 58.37, "high": 58.72, "low": 58.05, "close": 58.28 },
            { "time": "2019-08-01", "open": 58.28, "high": 58.63, "low": 57.96, "close": 58.16 },
            { "time": "2019-08-02", "open": 58.16, "high": 58.52, "low": 57.85, "close": 58.09 },
            { "time": "2019-08-05", "open": 58.09, "high": 58.44, "low": 57.77, "close": 57.89 },
            { "time": "2019-08-06", "open": 57.89, "high": 58.24, "low": 57.57, "close": 57.83 },
            { "time": "2019-08-07", "open": 57.83, "high": 58.18, "low": 57.51, "close": 57.76 },
            { "time": "2019-08-08", "open": 57.76, "high": 58.11, "low": 57.44, "close": 57.79 },
            { "time": "2019-08-09", "open": 57.79, "high": 58.14, "low": 57.47, "close": 57.67 },
            { "time": "2019-08-12", "open": 57.67, "high": 58.02, "low": 57.35, "close": 57.53 },
            { "time": "2019-08-13", "open": 57.53, "high": 57.88, "low": 57.21, "close": 57.46 },
            { "time": "2019-08-14", "open": 57.46, "high": 57.81, "low": 57.14, "close": 57.24 },
            { "time": "2019-08-15", "open": 57.24, "high": 57.59, "low": 56.92, "close": 57.09 },
            { "time": "2019-08-16", "open": 57.09, "high": 57.44, "low": 56.77, "close": 57.26 },
            { "time": "2019-08-19", "open": 57.26, "high": 57.61, "low": 56.94, "close": 57.43 },
            { "time": "2019-08-20", "open": 57.43, "high": 57.78, "low": 57.11, "close": 57.29 },
            { "time": "2019-08-21", "open": 57.29, "high": 57.64, "low": 56.97, "close": 57.42 },
            { "time": "2019-08-22", "open": 57.42, "high": 57.77, "low": 57.10, "close": 57.34 },
        ]);
    }

    useEffect(() => {
        const onWindowResize = () => {
            const height = (Math.max(window.innerHeight, 680) - 250 - 64);
            console.log("maxHeight", height);
            setMaxHeight(height)
            console.log(width, window.innerWidth);
            if(width != window.innerWidth) {
                setWidth(window.innerWidth)
                if(width > window.innerWidth) {
                    drawChart();
                }
            }
            if(height != maxHeight)
                drawChart();
        }

        window.addEventListener("resize", onWindowResize);
        window.addEventListener("maximize", onWindowResize);
        onWindowResize()

        return () => {
            window.removeEventListener("resize", onWindowResize);
            window.removeEventListener("maximize", onWindowResize);
        }
    }, [prefersDarkMode])
    
    useEffect(() => {
        if(!ref.current) return;
        drawChart()
    }, [ref, prefersDarkMode])



    return (
        <div className='w-full flex-grow max-w-full'>
            <div id="chart" ref={ref} className='h-full'></div>
        </div>
    )
}