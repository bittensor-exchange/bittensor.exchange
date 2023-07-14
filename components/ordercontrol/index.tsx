'use client'
import { useState } from 'react';
import cn from 'classnames'
import OrderForm from '../orderform';
import { TabContext, TabList } from '@mui/lab';
import { Tab } from '@mui/material';

export default function OrderControl () {

    const menu = ["Limit", "Market"];
    const [value, setValue] = useState('limit');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    
    return (
        <div className="h-[250px] w-full flex flex-col px-2">
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="Order tabs" className="flex items-end pl-2 space-x-4 !min-h-[36px] border-y dark:border-zinc-800">
                    {
                        menu.map((item, index) => (
                            <Tab label={item} value={item.toLowerCase()} className={cn("!text-[12px] font-mono !py-1 px-2 border-b-2 !min-h-[34px] ", index ==Number(value) ? "text-zinc-800 dark:text-white border-[#90caf9]" : "text-zinc-600 dark:text-zinc-400 border-[rgba(0,0,0,0)]")}/>
                        ))
                    }
                </TabList>
            </TabContext>
            <div className='flex space-x-2'>
                <OrderForm action='buy' type={value}/>
                <OrderForm action='sell' type={value}/>
            </div>
        </div>
    )
}