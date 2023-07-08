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
  border: '1px solid #555',
  boxShadow: 24,
  p: 4,
};

export default function DefaultModal({ isOpen, showModal, title = "", width = 500, children}) {
  
  return (
      <Modal
        open={isOpen}
        onClose={() => showModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={{...style, width}} className="bg-zinc-100 dark:bg-zinc-900">
          <div className='absolute right-2 top-2'>
            <IconButton onClick={() => showModal(false)}>
                <Close />
            </IconButton>
          </div>
          {
            title && 
            <Typography component="h6" variant="h6" className='-mt-4'>
                {title}
            </Typography>
          }
          <div className='pt-2'>
            {
                children
            }
          </div>
        </Box>
      </Modal>
  );
} 