"use client";
import Link from "next/link";
import Image from 'next/image'
import { Button, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { IRoot } from "@/data/store";
import { DarkMode, Light, LightMode, Notifications } from "@mui/icons-material";

export default function DashboardLayout({ children }: {
    children: React.ReactNode
  }) {

    const { user, login, loading } = useSelector((state: IRoot) => state.user);

    return (
        <section className="h-full max-h-full w-full flex flex-col">
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
                {
                    login && !loading && user && "Hello world!"
                }
                <div className="flex items-center pr-2 space-x-2"> 
                    <IconButton>
                        <div className="w-[36px] h-[36px] rounded-full border text-[14px] flex items-center justify-center border-zinc-600">
                            RC
                        </div>
                    </IconButton>
                    <IconButton>
                        <Notifications />
                    </IconButton>
                    <IconButton>
                        <LightMode />
                    </IconButton>
                </div>
            </nav>
            <main className="flex-grow">
                {children}
            </main>
            <footer className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
            </footer>
        </section>
    )
}