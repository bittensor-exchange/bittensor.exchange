'use client'
import cn from 'classnames'
import Orders from './orders';

export default function OrderBook () {
    
    const currentPrice = "0.020500";

    const sellOrders = [
        { price: "0.021000", amount: "10.5000" },
        { price: "0.022020", amount: "20.4500" },
        { price: "0.024522", amount: "25.0000" },
        { price: "0.025541", amount: "100.0000" },
        { price: "0.026069", amount: "50.0000" },
        { price: "0.027150", amount: "200.0000" },
        { price: "0.027250", amount: "120.0000" },
        { price: "0.027300", amount: "500.0000" },
        { price: "0.027300", amount: "500.0000" },
        { price: "0.027300", amount: "500.0000" },
        { price: "0.027300", amount: "500.0000" },
        { price: "0.027300", amount: "500.0000" },
        { price: "0.027300", amount: "500.0000" },
    ]

    const buyOrders = [
        { price: "0.020000", amount: "20.0000" },
        { price: "0.019020", amount: "20.4500" },
        { price: "0.018500", amount: "25.0000" },
        { price: "0.018400", amount: "100.0000" },
        { price: "0.018000", amount: "50.0000" },
        { price: "0.016500", amount: "200.0000" },
        { price: "0.016200", amount: "250.0000" },
        { price: "0.016000", amount: "300.0000" },
        { price: "0.016000", amount: "300.0000" },
        { price: "0.016000", amount: "300.0000" },
        { price: "0.016000", amount: "300.0000" },
        { price: "0.016000", amount: "300.0000" },
        { price: "0.016000", amount: "300.0000" },
    ];

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
                    <div className="text-[14px] font-mono">{currentPrice}</div>
                    <div className="pl-4 text-[12px]">50.8$</div>
                </div>
                <Orders type="buy" data={buyOrders} />
            </div>
        </div>
    )
}