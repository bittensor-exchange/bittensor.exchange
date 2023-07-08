'use client'
import cn from 'classnames'

export default function OrderList () {

    const activeMenu = "Open Orders";
    const menu = ["Open Orders", "Order History", "Trade History", "Deposits", "Withdrawals"];
    
    return (
        <div className="h-[240px] w-full flex flex-col">
            <ul className="flex items-end pl-2 space-x-4 h-[36px] border-y dark:border-zinc-800">
                {
                    menu.map((item, index) => (
                        <li key={index} className={cn("text-[12px] font-mono py-1 px-2 border-b-2", item == activeMenu ? "text-zinc-800 dark:text-white border-[#90caf9]" : "text-zinc-600 dark:text-zinc-400 border-[rgba(0,0,0,0)]")}>
                            {item}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}