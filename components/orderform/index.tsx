'use client'
import { Button, Slider, TextField, Tooltip } from '@mui/material'
import axios from 'axios';
import cn from 'classnames'
import numbro from 'numbro';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { updateOpenOrders } from '@/data/container/api';
import { IRoot } from '@/data/store';
import { fetchAsset } from '@/data/container/asset';
import { ThunkDispatch } from '@reduxjs/toolkit';
import useApi from '@/hooks/useApi';

const marks = [
    { value: 0, label: '',},
    { value: 25, label: '',},
    { value: 50, label: '',},
    { value: 75, label: '',},
    { value: 100, label: '',},
  ];    

export default function OrderForm ({ action = "buy", type = "limit" }) {

    const assets = useSelector((state:IRoot) => state.asset.assets);
    const pair = useSelector((state:IRoot) => state.pair.currentPair);

    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [iceberg, setIceberg] = useState("");
    const [sliderValue, setSliderValue] = useState(0);
    const [configData, setconfigData] = useState({MinTaoIcebergAmount: 0,
        MinBtcIcebergAmount: 0,
        NumberofIceberg: 0
    });
    const { data: config, mutate } = useApi("/api/configs");

    const btc = 30000;
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        const timer = setInterval(mutate, 3000);
        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        setconfigData({
            MinTaoIcebergAmount: config?.filter(item => item.key == "MinTaoIcebergAmount")[0]["value"],
            MinBtcIcebergAmount: config?.filter(item => item.key == "MinBtcIcebergAmount")[0]["value"],
            NumberofIceberg: config?.filter(item => item.key == "NumberofIceberg")[0]["value"]
        })
    }, [config])

    const onAmountChange = (e) => { 
        setAmount(e.target.value);
        const _amount = Number(e.target.value);
        const _price = Number(price);
        if(availableBalance && !Number.isNaN(_amount)) {
            if(action == "buy" && !Number.isNaN(_price) && type == "limit")
                setSliderValue((_price * _amount) / availableBalance * 100);
            if(action == "sell")
                setSliderValue(_amount / availableBalance * 100);
        }
    }

    const onSliderChange = (e, value) => {
        if (value == 0) setAmount("");
        if(action == "buy") {
            const _price = Number(price);
            if(!Number.isNaN(_price) && _price > 0)
                setAmount(numbro(availableBalance * Number(value) / 100 / _price).format({
                    mantissa: 6,
                    trimMantissa: true
                }));
            else setAmount("");
        }
        else setAmount(numbro(availableBalance * Number(value) / 100).format({
            mantissa: 6,
            trimMantissa: true
        }));
        setSliderValue(Number(value));
    }

    const createOrder = async () => {
        setLoading(true);
        try {
            const resp = await axios.post('/api/orders/create', {
                pair: 'TAO/BTC',
                price: type == "market" ? 0 : Number(price),
                amount: type == "iceberg" ? Number(iceberg) : Number(amount),
                action,
                type,
                icebergTotal: Number(amount),
                icebergfilled: 0
            })
            console.log(resp);
            setPrice("");
            setAmount("");
            setIceberg("");
            setSliderValue(0);
            enqueueSnackbar({
                message: <div><label className='text-[16px] font-bold'>Success!</label><br/>{`${type.toUpperCase()} ${action.toUpperCase()} TAO/BTC`}</div>,
                variant: 'success',
            });
            dispatch(updateOpenOrders());
            dispatchThunk(fetchAsset());
        } catch (error) {
            enqueueSnackbar({
                message: <div><label className='text-[16px] font-bold'>Error</label><br/>{`${error.response?.data?.message ?? error.message}`}</div>,
                variant: 'error',
            });
            
        } finally {
            setLoading(false);
        }
    }

    const availableToken = action == 'buy' ? pair.token2 : pair.token1;
    const availableBalance = assets.length > 0 ? assets.find(asset => asset.name == availableToken).available_balance : 0;
    const volumn = price && amount ? Number(price) * Number(amount) : 0;

    return (
        <div className="w-full flex flex-col px-1 py-2">
            <div className='w-full border dark:border-zinc-600 rounded h-[30px] flex items-center px-1 text-[12px] text-zinc-500 mt-2'>
                {
                    type == "market" ?
                        <div className='text-center w-full'>
                            Best Market Price
                        </div>
                        :
                        <>
                            <label>Price</label>
                            <Tooltip title={`≈ ${numbro(btc * Number(price)).formatCurrency()}`} placement="top-end" arrow sx={{fontSize: 14}}>
                                <input className='bg-transparent flex-grow px-2 text-right text-[14px] font-bold outline-none w-[50px] dark:text-white' 
                                    value={ price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    disabled = { loading }
                                />
                            </Tooltip>
                            <label>BTC</label>
                        </>
                }
            </div>
            
            <div className='flex gap-1'>
                <div className={cn('w-full border dark:border-zinc-600 rounded h-[30px] flex items-center px-1 text-[12px] text-zinc-500 mt-2', sliderValue > 100 || parseInt(amount) < configData?.MinTaoIcebergAmount  && 'animate-shake !border-sell/[0.8]')}>
                    <label>Amount</label>
                    <Tooltip title={type != "iceberg" ? "" : `Min Amount: ${configData?.MinTaoIcebergAmount}`} placement='bottom-end' arrow sx={{fontSize: 14}}>
                        <input className='bg-transparent flex-grow px-2 text-right text-[14px] font-bold outline-none w-[50px] dark:text-white' 
                            value={amount}
                            onChange={onAmountChange}
                        />
                    </Tooltip>
                    <label>{ pair.token1 } </label>
                </div>
                {type == "iceberg" && 
                    <div className={cn('w-full border dark:border-zinc-600 rounded h-[30px] flex items-center px-1 text-[12px] text-zinc-500 mt-2', parseInt(iceberg) < Math.max(configData?.MinTaoIcebergAmount, parseInt(amount) / configData?.NumberofIceberg) && 'animate-shake !border-sell/[0.8]')}>
                        <Tooltip title={`Min Amount: ${!Math.max(configData?.MinTaoIcebergAmount, parseInt(amount) / configData?.NumberofIceberg) ? "0" : Math.max(configData?.MinTaoIcebergAmount, parseInt(amount) / configData?.NumberofIceberg) }`} placement='bottom-end' arrow sx={{fontSize: 14}}>
                            <input className='bg-transparent flex-grow px-2 text-right text-[14px] font-bold outline-none w-[50px] dark:text-white' 
                                value={iceberg}
                                onChange={(e) => setIceberg(e.target.value)}
                            />
                        </Tooltip>
                        <label>{ pair.token1 } </label>
                    </div>
                }
            </div>
            <Slider
                aria-label="slider"
                defaultValue={0}
                value={sliderValue}
                step={10}
                valueLabelDisplay='auto'
                disabled={ type == "market" && action == "buy" }
                valueLabelFormat={(value) => `${numbro(availableBalance * value / 100).format({ mantissa: 6, trimMantissa: true })} ${availableToken}`}
                onChange={onSliderChange}
                color={sliderValue > 100 ? "secondary" : "primary"}
                marks={marks}
                size='small'
            />
            <div className='flex justify-between text-[12px] mb-2 px-1 dark:text-zinc-300'>
                <label>Available:</label>
                <label className='text-right'>
                    { numbro(availableBalance).format({ mantissa: 6, trimMantissa: true }) }
                    &nbsp;
                    { action == "buy" ? pair.token2 : pair.token1} 
                </label>
            </div>
            <div className='flex justify-between text-[12px] mb-2 px-1 dark:text-zinc-300'>
                <label>Volumn:</label>
                <label className='text-right'>
                    {numbro(volumn).format({ mantissa: 6, trimMantissa: true })}
                    &nbsp;
                    {pair.token2} 
                </label>
            </div>
            <LoadingButton variant='contained' color={action=="buy" ? "success" : "error"} className='dark:text-[#0d180e]'
                onClick={() => createOrder()}
                loading={loading}
            >
                {action} TAO
            </LoadingButton>
        </div>
    )
}