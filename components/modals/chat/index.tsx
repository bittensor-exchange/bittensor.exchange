'use client'
import * as React from 'react';
import Image from 'next/image';
import { FormControl, InputLabel, Select, MenuItem, TextField, IconButton, InputAdornment, OutlinedInput, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyAll } from '@mui/icons-material';
import { IRoot } from '@/data/store';
import { useSelector } from 'react-redux';
import DefaultModal from '..';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";
import useApi from '@/hooks/useApi';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "80vw",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  })
);

export default function ChatModal({ isOpen, showModal, curTicket}) {
  const classes = useStyles();
  const [chatData, setChatData] = useState([]);
  const [newStr, setNewStr] = useState("");
  const { data: rows, loading, mutate } = useApi(`/api/ticket/all/${curTicket?.original?.id}`);

  useEffect(() => {
    setChatData(rows);
  }, [rows])

  const onPressButton = async () => {
    await axios.put("/api/ticket/adduser", {supportId: curTicket?.original?.id, userStr: newStr});
    mutate();
  }

  return (
      <DefaultModal isOpen={isOpen} showModal={showModal} title={curTicket?.original?.title} width={"80%"}>
        <div className='flex items-center justify-center'>
          <Paper className={`${classes.paper} !bg-transparent`}>
        <Paper id="style-1" className={`${classes.messagesBody} !bg-transparent`}>
          {
            chatData?.map((item, key) => {
              if (item?.adminStr)
                return <MessageLeft message={item?.adminStr} timestamp={item?.createdAt} key={key}/>;
              if (item?.userStr)
                return <MessageRight message={item?.userStr} timestamp={item?.createdAt} key={key}/>;
            })
          }
          {/* <MessageLeft
            message="I have a problem"
            timestamp="MM/DD 00:00"
          />
          <MessageLeft
            message="I can not receive tao"
            timestamp="MM/DD 00:00"
          />
          <MessageRight
            message="You can easily solve this problem"
            timestamp="MM/DD 00:00"
          />
          <MessageRight
            message="Here is the solution you can follow this."
            timestamp="MM/DD 00:00"
          />
          <MessageRight
            message="There is tons of tao transaction explorers"
            timestamp="MM/DD 00:00"
          />
          <MessageRight
            message="You can use anything of that."
            timestamp="MM/DD 00:00"
          /> */}
        </Paper>
        <TextInput setNewStr={setNewStr} onPressButton={onPressButton}/>
      </Paper>
      </div>
      </DefaultModal>
  );
} 