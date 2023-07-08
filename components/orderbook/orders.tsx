'use client'
import numbro from "numbro"
import cn from "classnames"
import { useEffect, useState } from "react"

export default function Orders ({ type = "buy", data = [] }) {

    const [maxHeight, setMaxHeight] = useState(0)

    useEffect(() => {
        const onWindowResize = () => {
            const height = (Math.max(window.innerHeight, 680) - 240 - 64 - 60) / 2;
            setMaxHeight(height)
        }

        window.addEventListener("resize", onWindowResize);
        onWindowResize()

        return () => {
            window.removeEventListener("resize", onWindowResize);
        }
    }, [])

    return (
        <div className={cn("w-full flex", type == "buy" ? "flex-col" : "flex-col-reverse" )}
            style={{ height: maxHeight }}
        >
            {
                data.slice(0, maxHeight / 24).map((item, index) => (
                    <div key={index} className="flex items-center justify-between px-2 py-1 text-[10px]">
                        <div className={cn("w-[90px]", type == "buy" ? "text-buy" : "text-sell")}>
                            {item.price}
                        </div>
                        <div className="w-[100px] text-right">
                            {item.amount}
                        </div>
                        <div className="w-[100px] text-right">
                            {numbro(item.price * item.amount).format({ mantissa: 2 })}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}