'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem, TextField, IconButton, InputAdornment, OutlinedInput, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyAll, QrCode, Close } from '@mui/icons-material';
import { IRoot } from '@/data/store';
import { useSelector } from 'react-redux';
import DefaultModal from '..';
import axios from 'axios';
import { updateOpenOrders } from '@/data/container/api';
import { fetchAsset } from '@/data/container/asset';
import { enqueueSnackbar } from 'notistack';
import { type } from 'os';
import { LoadingButton } from '@mui/lab';
import { truncateAddress, copy2Clipboard } from '@/utils/helpers';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 540,
  border: '1px solid #555',
  boxShadow: 24,
  p: 4,
};

export default function WithdrawalModal({ isOpen, showModal}) {
  
  const [assetNo, selectAsset] = useState(0);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { assets } = useSelector((state: IRoot) => state.asset);
  const [withdrawId, setWithdrawId] = useState(0);
  const [confirmationCode, setConfirmtionCode] = useState('');

  const withdrawToken = async () => {
    
    setLoading(true);
      try {
          const resp = await axios.post('/api/withdraw', {
            token: assets[assetNo].name,
            network: assets[assetNo].network,
            amount: Number(amount),
            address: address,
          });
          console.log(resp);
          enqueueSnackbar({
              message: <div><label className='text-[16px] font-bold'>Success!</label><br/>{`Please confirm your email`}</div>,
              variant: 'success',
          });
          setWithdrawId(resp['id']);
      } catch (error) {
          enqueueSnackbar({
              message: <div><label className='text-[16px] font-bold'>Error</label><br/>{`${error.response?.data?.message ?? error.message}`}</div>,
              variant: 'error',
          });
          
      } finally {
          setLoading(false);
      }
  }

  const confirmWithdrawal = async () => {
    try {
      const resp = await axios.put(`/api/withdraw/confirm/${withdrawId}`, { confirmationCode });
      console.log(resp);
      enqueueSnackbar({
          message: <div><label className='text-[16px] font-bold'>Success!</label><br/>{`Your withdrawal request is approved`}</div>,
          variant: 'success',
      });
      showModal(false);
  } catch (error) {
      enqueueSnackbar({
          message: <div><label className='text-[16px] font-bold'>Error</label><br/>{`${error.response?.data?.message ?? error.message}`}</div>,
          variant: 'error',
      });
      
  } finally {
      setLoading(false);
  }
  }

  useEffect(() => {
    setWithdrawId(0);
    setAddress('');
    setAmount('');
    selectAsset(0);
    setConfirmtionCode('');
  }, [isOpen])

  return (
      <DefaultModal isOpen={isOpen} showModal={showModal} title='Withdraw Crypto'>
          <FormControl fullWidth sx={{mt: 4}}>
            <InputLabel id="select-coin">Coin</InputLabel>
            <Select
              labelId="select-coin"
              id="select-coin"
              label="Coin"
              value={assetNo}
              disabled={withdrawId > 0}
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
          {
            withdrawId == 0 &&
            <>
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
              <TextField
                    required
                    fullWidth
                    name="address"
                    label="Withdrawal address"
                    id="address"
                    autoComplete="new-password"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </FormControl>
              <FormControl fullWidth sx={{ mt: 3 }} variant="outlined" aria-readonly>
                <TextField
                      required
                      fullWidth
                      name="amount"
                      label="Withdrawal Amount"
                      id="amount"
                      autoComplete="new-password"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                  />
              </FormControl>
              <div className='mt-4 text-zinc-500 dark:text-zinc-400 text-[14px]'>
                <label>Withdrawal Fee: </label>
                <label><span className='text-zinc-900 dark:text-white'>0.0001</span> {assets[assetNo]?.name}</label>
              </div>
              <div className='mt-4 text-zinc-500 dark:text-zinc-400 text-[14px]'>
                <label>Please confirm the withdrawal address </label>
              </div>
              <LoadingButton
                  fullWidth
                  loading={loading}
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: "white" }}
                  color="success"
                  type="submit"
                  onClick={() => withdrawToken()}
              >
                  Withdraw
              </LoadingButton>
            </>
          }
          {
            withdrawId > 0 &&
            <>
              <div className='mt-4 text-zinc-500 dark:text-zinc-400 text-[14px] flex justify-between items-center'>
                <label>Withdrawal address: </label>
                <label className='dark:text-white font-bold'>{truncateAddress(address)}
                <IconButton
                  aria-label="Copy Address"
                  edge="end"
                  onClick={() => copy2Clipboard(address)}
                >
                  <CopyAll />
                </IconButton>
                </label>
              </div>
              <div className='mt-4 text-zinc-500 dark:text-zinc-400 text-[14px] flex justify-between items-center'>
                <div>
                  <label>Amount: </label>
                  <label className='dark:text-white font-bold'>{amount}</label>
                </div>
                <div>
                  <label>Network: </label>
                  <label className='dark:text-white font-bold'>{assets[assetNo].network}</label>
                </div>
              </div>
              <div className='mt-5 text-zinc-500 dark:text-zinc-400 text-[16px] flex justify-between mb-4'>
                Enter your 4-digt confirmation code please.
              </div>
              <TextField
                    required
                    fullWidth
                    name="confirmationCode"
                    label="Confirmation Code"
                    id="confirmationCode"
                    value={confirmationCode}
                    onChange={(e) => setConfirmtionCode(e.target.value)}
                />
              <LoadingButton
                  fullWidth
                  loading={loading}
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: "white" }}
                  color="success"
                  type="submit"
                  onClick={() => confirmWithdrawal()}
              >
                  Confirm Withdrawal
              </LoadingButton>
            </>
          }
      </DefaultModal>
  );
} 