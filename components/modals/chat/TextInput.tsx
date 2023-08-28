import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@mui/icons-material/Send';
import { TextField, Button } from '@mui/material';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "98%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  })
);


export const TextInput = ({setNewStr, onPressButton}) => {
    const classes = useStyles();
    const [str, setStr] = useState("");
    const handleKeyDown = (event) => {
        if ((event.shiftKey || event.ctrlKey) && event.key === 'Enter') {
          onPressButton();
          setStr("");
        }
      };
    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField
                label="Type here your problem"
                variant='filled'
                value={str}
                multiline
                maxRows={10}
                sx={{ width: "100%"}}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                    setStr(e.target.value);
                    setNewStr(e.target.value);
                }}
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={() => {
                onPressButton();
                setStr("");
            }}>
                <SendIcon />
            </Button>
            </form>
        </>
    )
}



