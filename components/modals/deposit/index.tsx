'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem, TextField, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyAll, QrCode, Close } from '@mui/icons-material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  border: '1px solid #555',
  boxShadow: 24,
  p: 4,
};

export default function DepositModal({ isOpen, showModal}) {
  
  const coins = {
    "TAO": { 
      networks: {
        "Bittensor": "TAO"
      }
    },
    "BTC": { 
      networks: {
        "Bitcoin": "BTC"
      }
    },
    "USDT": { 
      networks: {
        "Tron": "TRX",
        "Etherium": "ETH",
      }
    },
  }

  const [coin, selectCoin] = useState('TAO');
  const [network, selectNetwork] = useState('Bittensor');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if(!coin || !network) {
      setAddress('');
      return;
    }
    setAddress('3GjTq5EXcXonGm2cLgWUQ6U4gj4DfRhiaa')
  }, [coin, network])
  
  return (
      <Modal
        keepMounted
        open={isOpen}
        onClose={() => showModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className="bg-zinc-100 dark:bg-zinc-900">
          <div className='flex justify-between items-center'>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              Deposit Crypto
            </Typography>
            <IconButton onClick={() => showModal(false)}>
              <Close />
            </IconButton>
          </div>
          <FormControl fullWidth sx={{mt: 4}}>
            <InputLabel id="select-coin">Coin</InputLabel>
            <Select
              labelId="select-coin"
              id="select-coin"
              label="Coin"
              value={coin}
              onChange={(e) => { selectCoin(e.target.value); selectNetwork(Object.keys(coins[e.target.value].networks)[0]) }}
            >
              {
                Object.keys(coins).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <div className='flex space-x-2'>
                      <Image
                          className="rounded-full"
                          src={`/coins/${item.toLowerCase()}.png`}
                          alt={item}
                          width={24}
                          height={24}
                          priority
                      />
                      <label>{item}</label>
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
              value={network}
              onChange={(e) => selectNetwork(e.target.value)}
            >
              {
                Object.keys(coins[coin].networks).map((item, index) => (
                  <MenuItem key={index} value={item}>
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
              value={address}
              id="deposit-address"
              endAdornment={
                <InputAdornment position="end">
                  {/* <IconButton
                    aria-label="Show QR Code"
                    edge="end"
                  >
                    <QrCode />
                  </IconButton> */}
                  <IconButton
                    aria-label="Copy Address"
                    edge="end"
                    onClick={e => navigator.clipboard.writeText(address)}
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
            <label><span className='text-zinc-900 dark:text-white'>0.0002</span> BTC</label>
          </div>
          <div className='mt-4 text-zinc-500 dark:text-zinc-400 text-[14px]'>
            <label>Deposit Confirmation: </label>
            <label><span className='text-zinc-900 dark:text-white'>1</span> Block(s)</label>
          </div>
        </Box>
      </Modal>
  );
} 