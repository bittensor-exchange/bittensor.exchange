'use client'
import Orders from './orders';
import useApi from '@/hooks/useApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchLastTrade } from "@/data/container/pair";
import { IRoot } from "@/data/store";
import cn from 'classnames';

export default function OrderBook () {
    
    const { name: currentPairName } = useSelector((state: IRoot) => state.pair.currentPair);
    const { price: lastPrice, takerAction } = useSelector((state: IRoot) => state.pair.lastTrade);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const { data: orders, mutate } = useApi("/api/orders", { pair: "TAO/BTC" });

    const [buyOrders, sellOrders] = orders || [[],[]];

    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        const timer = setInterval(mutate, 1000);
        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        if(!currentPairName) return;

        const timer = setInterval(() => {
            dispatch(fetchLastTrade(currentPairName));
        }, 1500);

        dispatch(fetchLastTrade(currentPairName));

        return () => {
            clearInterval(timer);
        }
    }, [currentPairName])

    useEffect(() => {
        setHighlight(true);
        const timer = setTimeout(() => {
            setHighlight(false);
        }, 1000)
        return () => clearTimeout(timer);
    }, [lastPrice, takerAction]);


    return (
        <div className="w-[250px] flex flex-col px-2">
            <div className='flex flex-col'>
                <div className="text-[12px] pt-2 pb-1 flex">
                    <div className="w-[90px]">
                        Price (TAO)
                    </div>
                    <div className="w-[100px] text-right">
                        Amount
                    </div>
                    <div className="w-[100px] text-right">
                        Total
                    </div>
                </div>
                <Orders type="sell" data={sellOrders} />
            </div>
            <div className='flex flex-col'>
                <div className="flex text-[12px] text-bold py-1 items-center">
                    <div className={cn("text-[14px] font-mono", highlight && (takerAction == "buy" ? 'text-buy' : 'text-sell'))}>{lastPrice ?? ""}</div>
                    <div className="pl-4 text-[12px]">50.8$</div>
                </div>
                <Orders type="buy" data={buyOrders} />
            </div>
        </div>
    )
}