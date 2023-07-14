'use client'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import cn from 'classnames'
import { useState } from 'react';
import OpenOrders from './openorders';
import OrderHistory from './orderhistory';
import TradeHistory from './tradehistory';
import Deposits from './deposits';
import Withdrawals from './withdrawals';

export default function OrderList () {

    const menu = ["Open Orders", "Order History", "Trade History", "Deposits", "Withdrawals"];
    const [value, setValue] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    
    return (
        <div className="h-[250px] w-full flex flex-col">
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="Order tabs" className="flex items-end pl-2 space-x-4 !min-h-[36px] border-y dark:border-zinc-800">
                    {
                        menu.map((item, index) => (
                            <Tab key={index} label={item} value={index + ""} className={cn("!text-[12px] font-mono !py-1 px-2 border-b-2 !min-h-[34px] ", index ==Number(value) ? "text-zinc-800 dark:text-white border-[#90caf9]" : "text-zinc-600 dark:text-zinc-400 border-[rgba(0,0,0,0)]")}/>
                        ))
                    }
                </TabList>
                <TabPanel sx={{padding: '0', height: 200, flexGrow: 1}} value="0"><OpenOrders/></TabPanel>
                <TabPanel sx={{padding: '0', height: 200, flexGrow: 1}} value="1"><OrderHistory/></TabPanel>
                <TabPanel sx={{padding: '0', height: 200, flexGrow: 1}} value="2"><TradeHistory/></TabPanel>
                <TabPanel sx={{padding: '0', height: 200, flexGrow: 1}} value="3"><Deposits/></TabPanel>                
                <TabPanel sx={{padding: '0', height: 200, flexGrow: 1}} value="4"><Withdrawals/></TabPanel>                
            </TabContext>
        </div>
    )
}

export const DataGridStyle = {
    border: 'none',
    textTransform: 'capitalize',
    '& .MuiDataGrid-columnHeaders': {
      minHeight: '36px !important',
      height: '36px !important',
      fontSize: '12px !important'
    },
    '& .MuiDataGrid-columnHeader': {
      outline: 'none !important',
      userSelect: 'none'
    },
    '& .MuiDataGrid-row': {
      minHeight: '36px !important',
      height: '36px !important',
      fontSize: '12px !important',
    },
    '& .MuiDataGrid-cell': {
      minHeight: '36px !important',
      height: '36px !important',
      fontSize: '12px !important',
      outline: 'none !important',
    },
  }