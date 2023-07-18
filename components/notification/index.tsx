import useApi from "@/hooks/useApi";
import { Close, Notifications } from "@mui/icons-material";
import { Badge, Button, IconButton, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchAsset } from "@/data/container/asset";
import { updateOpenOrders } from "@/data/container/api";

export default function Notification() {

  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const dispatch = useDispatch();
  const { data: notifications, mutate }: {data: Array<any>, mutate: Function} = useApi('/api/notifications/unreads');

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);

  useEffect(() => {
    const timerId = setInterval(() => {
      mutate();
    }, 10000)
    return () => {
      clearInterval(timerId);
    }
  }, [])

  useEffect(() => {
    if(!notifications || notifications.length == 0) return;
    const title = notifications[0].title.toLowerCase();
    if(title.includes('deposit') || title.includes('withdraw') || title.includes('order')) {
      dispatchThunk(fetchAsset()); 
      dispatch(updateOpenOrders());
    }
  }, [notifications])

  const readNotification = (id) => {
    console.log('read', id)
    axios.put(`/api/notifications/read/${id}`).then(res => { 
      mutate();
    });
  }

  const readAllNotification = () => {
    console.log('readAll');
    axios.post(`/api/notifications/read/all`).then(res => { 
      mutate();
    });
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Badge color="success" variant="dot" invisible={notifications && notifications.length ? false : true}>
            <Notifications />
        </Badge>
      </IconButton>
      <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
              }}
          >
          <ul className='flex flex-col p-1 divide-y min-w-[200px]'>
            {
              (notifications && notifications.length) ? notifications.slice(0,4).map((notification, index) => (
                <li key={index} className="flex flex-col p-2 dark:hover:bg-zinc-900 pr-8 relative">
                  <label className="text-[14px] font-bold">{notification.title}</label>
                  <div className="text-[12px] pt-1">{notification.body}</div>
                  <div className="text-[10px]">{moment(notification.createdAt).toLocaleString()}</div>
                  <IconButton sx={{width:14, height:14, position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)'}} onClick={() => readNotification(notification.id)}>
                    <Close sx={{width: 10, height: 10}} />
                  </IconButton>
                </li>
              )) :
              <li className="flex flex-col space-y-1 p-2 dark:hover:bg-zinc-900 pr-8 relative">
                No notifications
              </li>
            }
            {
              (notifications && notifications.length > 2) &&
              (
                <li className="flex flex-col pt-1 relative">
                  <Button variant="text" onClick={readAllNotification} size="small" sx={{background: "transparent"}} fullWidth>Read all</Button>
                </li>
              )
            }
          </ul>
      </Popover>
    </div>
  )
}