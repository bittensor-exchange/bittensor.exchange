'use client'
import { Button, Slider, TextField } from '@mui/material'
import cn from 'classnames'

const marks = [
    { value: 0, label: '',},
    { value: 25, label: '',},
    { value: 50, label: '',},
    { value: 75, label: '',},
    { value: 100, label: '',},
  ];    
  
function valuetext(value: number) {
return `${value}°C`;
}

export default function OrderForm ({ type = "buy" }) {

    return (
        <div className="w-full flex flex-col px-2 space-y-2 py-2">
            <div className="text-[12px]">
                {type == "buy" ? "Buy" : "Sell"} TAO
            </div>
            <div className='w-full border dark:border-zinc-600 rounded h-[30px] flex items-center px-1 text-[12px] text-zinc-500'>
                <label>Price</label>
                <input className='bg-transparent flex-grow px-2 text-right text-[14px] font-bold outline-none w-[50px]' />
                <label>BTC</label>
            </div>
            <div className='w-full border dark:border-zinc-600 rounded h-[30px] flex items-center px-1 text-[12px] text-zinc-500'>
                <label>Amount</label>
                <input className='bg-transparent flex-grow px-2 text-right text-[14px] font-bold outline-none w-[50px] text-white' />
                <label>TAO</label>
            </div>
            <Slider
                aria-label="Custom marks"
                defaultValue={0}
                getAriaValueText={valuetext}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                size='small'
            />
            <Button variant='contained' color={type=="buy" ? "success" : "error"} className='dark:text-[#0d180e]'>{type} TAO</Button>
        </div>
    )
}