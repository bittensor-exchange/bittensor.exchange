'use client'
import { IRoot } from '@/data/store';
import useApi from '@/hooks/useApi';
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
    const [chartData, setChartData] = useState([]);

    const [maxHeight, setMaxHeight] = useState(376)
    const [width, setWidth] = useState(0);
    const { name: currentPairName, quote_price } = useSelector((state: IRoot) => state.pair.currentPair);
    const { data: totalData, mutate: mutateTotalData } = useApi(`/api/trades/historychat/${currentPairName.replace('/', '_')}`);
    const { data: lastDayData, loading, mutate } = useApi(`/api/trades/lastdayhistorychat/${currentPairName.replace('/', '_')}`);

    useEffect(() => {
        mutateTotalData();
        const refetch = async () => {
            mutate();
          };
        refetch();
        const timerId = setInterval(() => refetch(), 5000);
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        if (typeof totalData === 'undefined' || typeof lastDayData === 'undefined') return;
        const temptotalData : [] = totalData;
        const tempLastDayData : [] = lastDayData;
        let temp: Array<any> = totalData;
        if (temptotalData.slice(-1)[0]["time"] == tempLastDayData["time"])
            temp[temp.length - 1] = tempLastDayData;
        else
            temp.push(tempLastDayData);
        setChartData(temp.map((item, index) => {
            return {
                time: item.time,
                open: (temp[index-1]?.close ?? item.low) * quote_price,
                high: item.high * quote_price,
                low: item.low * quote_price,
                close: item.close * quote_price,
            }
        }));
    }, [totalData, lastDayData])

    useEffect(() => {
        drawChart();
    }, [chartData])

    const drawChart = () => {
        if (typeof chartData == "undefined" || !chartData.length) return;
        console.log("drawChart", chartData);
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
        candleSeries.setData(chartData);
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