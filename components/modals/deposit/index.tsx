'use client'
import * as React from 'react';
import Image from 'next/image';
import { FormControl, InputLabel, Select, MenuItem, TextField, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyAll } from '@mui/icons-material';
import { IRoot } from '@/data/store';
import { useSelector } from 'react-redux';
import { copy2Clipboard } from '../../../utils/helpers';
import DefaultModal from '..';

export default function DepositModal({ isOpen, showModal, selectedCoin}) {
  
  const [assetNo, selectAsset] = useState(selectedCoin);
  const { assets } = useSelector((state: IRoot) => state.asset);
  useEffect(() => {
    selectAsset(selectedCoin);
  }, [isOpen])

  return (
      <DefaultModal isOpen={isOpen} showModal={showModal} title='Deposit Crypto'>
        <FormControl fullWidth sx={{mt: 4}}>
          <InputLabel id="select-coin">Coin</InputLabel>
          <Select
            labelId="select-coin"
            id="select-coin"
            label="Coin"
            value={assetNo}
            onChange={(e) => { selectAsset(Number(e.target.value));}}
          >
            {
              assets.map((item, index) => (
                <MenuItem key={index} value={index}>
                  <div className='flex space-x-2'>
                    <Image
                        className="rounded-full"
                        src={`/coins/${item.name.toLowerCase()}.png`}
                        alt={item.name}
                        width={24}
                        height={24}
                        priority
                    />
                    <label>{item.name}</label>
                  </div>
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{mt: 3}}>
          <InputLabel id="select-network">Network</InputLabel>
          <Select
            labelId="select-network"
            id="select-network"
            label="Network"
            value={0}
          >
            {
              assets.length > 0 &&
              [assets[assetNo].network].map((item, index) => (
                <MenuItem key={index} value={index}>
                  <div className='flex space-x-2'>
                    <label>{item}</label>
                  </div>
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }} variant="outlined" aria-readonly>
          <InputLabel htmlFor="address">Address</InputLabel>
          <OutlinedInput
            value={assets.length > 0 ? assets[assetNo].deposit_address : ''}
            sx={{ fontSize: '14px' }}
            id="deposit-address"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Copy Address"
                  edge="end"
                  onClick={() => copy2Clipboard(assets[assetNo].deposit_address)}
                >
                  <CopyAll />
                </IconButton>
              </InputAdornment>
            }
            label="Address"
          />
        </FormControl>
        <div className='mt-4 text-zinc-500 dark:text-zinc-400 text-[14px]'>
          <label>Minimal Amount: </label>
          <label><span className='text-zinc-900 dark:text-white'>0.0002</span> {assets.length > 0 ? assets[assetNo].name : 'BTC'}</label>
        </div>
        <div className='mt-4 text-zinc-500 dark:text-zinc-400 text-[14px]'>
          <label>Deposit Confirmation: </label>
          <label><span className='text-zinc-900 dark:text-white'>1</span> Block(s)</label>
        </div>
      </DefaultModal>
  );
} 