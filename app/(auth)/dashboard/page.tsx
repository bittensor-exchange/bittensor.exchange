'use client'
import Assets from "@/components/assets";
import Chart from "@/components/chart";
import OrderBook from "@/components/orderbook";
import OrderControl from "@/components/ordercontrol";
import OrderList from "@/components/orderlist";
import { useEffect, useState } from "react";
import cn from "classnames";

export default function Dashboard() {
  
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', onResize);
    window.addEventListener('maximize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('maximize', onResize);
    }
  }, [])

  return (
      <div className="relative flex max-h-full h-full">
        <div className="min-w-[500px] w-[500px] flex flex-col h-full">
          <div className="flex-grow flex shrink">
            <Assets />
            <OrderBook />
          </div>
          <div className="flex w-full items-between border-t dark:border-zinc-800">
            <OrderControl />
          </div>
        </div>
        <div className={cn("flex flex-col flex-grow h-full text-[32px] from-zinc-200 font-mono lg:flex-grow lg:m-w-[500px] border-l dark:border-zinc-800 w-full", width == 0 && 'hidden')}
          style={{
            maxWidth: width - 500,
            maxHeight: Math.max(height, 680) - 64
          }}
        >
          <Chart />
          <OrderList />
        </div>
      </div>
  )
}