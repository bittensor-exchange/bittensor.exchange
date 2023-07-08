'use client'
import { AddBox, Input, Output, Visibility } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import numbro from 'numbro'
import Image from 'next/image'
import DepositModal from '../modals/deposit'
import { useState } from 'react'

export default function Assets () {

    const [isDepositModalOpen, showDepositModal] = useState(false)

    const coins = [
        { name: "TAO", total: 30.00 },
        { name: "BTC", total: 0.030201 },
        { name: "USDT", total: 2500.00 },
    ]

    return (
        <div className="w-[250px] flex flex-col px-4 border-r dark:border-zinc-800 space-y-2">
            <div className="py-2 flex items-end pt-4 pl-2">
                <label className='pr-2'>Assets Overview</label>
                <IconButton aria-label="visibility" sx={{width: 20, height: 20}}>
                    <Visibility sx={{width: 16, height: 16}} />
                </IconButton>
            </div>
            <div className='flex items-end pl-2 pt-2'>
                <label>50 TAO</label>
                <label className='pl-2 text-[12px] text-zinc-400'>≈ {numbro(2537).formatCurrency()}</label>
            </div>
            <div className='flex justify-between pt-2 space-x-2'>
                <Button variant='contained' color="success" size='small' fullWidth onClick={() => showDepositModal(true)}>Deposit</Button>
                <Button variant='contained' color="error" size='small' fullWidth className='dark:text-[#0d180e]' >Withdraw</Button>
            </div>
            <div>
                <div className="text-[12px] pt-8 pb-1 flex">
                    <div className="w-[130px]">
                        Coin
                    </div>
                    <div className="w-[120px]">
                        Total
                    </div>
                    <div className="w-[100px] text-right">
                        Action
                    </div>
                </div>
                {
                    coins.map((item, index) => (
                        <div key={index} className="text-[12px] flex items-center py-1">
                            <div className="w-[130px] flex items-center">
                                <Image
                                    className="rounded-full"
                                    src={`/coins/${item.name.toLowerCase()}.png`}
                                    alt={item.name}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <label className='pl-1'>{item.name}</label>
                            </div>
                            <div className="w-[120px]">
                                {numbro(item.total).format({thousandSeparated: true})}
                            </div>
                            <div className="w-[100px] text-right">
                                <IconButton aria-label="visibility" sx={{width: 24, height: 24}}>
                                    <AddBox sx={{width: 20, height: 20}} />
                                </IconButton>
                                <IconButton aria-label="visibility" sx={{width: 24, height: 24}}>
                                    <Output sx={{width: 20, height: 20}} />
                                </IconButton>
                            </div>
                        </div>
                    ))
                }
            </div>
            <DepositModal isOpen={isDepositModalOpen} showModal={showDepositModal} />
        </div>
    )
}