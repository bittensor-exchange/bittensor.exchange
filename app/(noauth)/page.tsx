"use client";
import Assets from "@/components/assets";
import Chart from "@/components/chart";
import FirstLoading from "@/components/loading/firstloading";
import OrderBook from "@/components/orderbook";
import OrderControl from "@/components/ordercontrol";
import OrderList from "@/components/orderlist";
import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import cn from 'classnames';

export default function Home() {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="h-full max-h-full w-full">
      { loading && <FirstLoading /> }
      <section className={cn("h-full max-h-full w-full flex flex-col", loading && "hidden")}>
        <nav className="z-10 w-full items-center justify-between font-mono text-sm flex h-[64px] shrink-0 border-b dark:border-zinc-800 shadow dark:shadow-none dark:bg-zinc-900">
            <Link href="/" className="flex items-center ml-2 w-[250px]">
                <Image
                    className=""
                    src="/banner.svg"
                    alt="Tensor Exchange"
                    width={180}
                    height={48} 
                    priority
                    quality={100}
                />  
            </Link>
            <div className="flex-grow flex space-x-4 font-sans text-[12px] text-zinc-500 dark:text-zinc-400">
                <div className="flex flex-col text-[16px] font-mono justify-center text-zinc-800 dark:text-white">
                    TAO/BTC
                </div>
                <div className="flex flex-col">
                    <label className="text-[14px] text-buy">0.0017852</label>
                    <label>$50.8</label>
                </div>
                <div className="flex flex-col">
                    <label>24h Change</label>
                    <label className="text-sell">-0.00012 -0.8%</label>
                </div>
                <div className="flex flex-col">
                    <label>24h High</label>
                    <label className="text-zinc-400 dark:text-white">0.0017930</label>
                </div>
                <div className="flex flex-col">
                    <label>24h Low</label>
                    <label className="text-zinc-400 dark:text-white">0.0017745</label>
                </div>
                <div className="flex flex-col">
                    <label>24h Volumn</label>
                    <label className="text-zinc-400 dark:text-white">0.35 BTC</label>
                </div>
            </div>
            <div className="flex items-center pr-2 space-x-2"> 
                <Link href="/login"><Button variant="text" color="success">Log In</Button></Link>
                <Link href="/signup"><Button variant="contained" color="success">Sign Up</Button></Link>
            </div>
        </nav>
        <main className="flex-grow">
            
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
            <div className="flex flex-col flex-grow h-full text-[32px] from-zinc-200 font-mono lg:flex-grow lg:m-w-[500px] border-l dark:border-zinc-800">
              <Chart />
              {/* <div className="flex-grow"></div> */}
              <OrderList />
            </div>
          </div>
        </main>
        <footer className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        </footer>
      </section>
    </div>
  )
}