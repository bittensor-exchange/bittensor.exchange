"use client"
import { IRoot } from '@/data/store';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { SnackbarProvider } from 'notistack';
import cn from 'classnames';

export default function Theme({ children }) {
  const themeColor = useSelector((state: IRoot) => state.config.theme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeColor,
          primary: {
            light: '#48C076',
            main: '#48C076',
            dark: '#48C076',
            contrastText: '#fff',
          },
          error: {
            main: '#d9304e',
            contrastText: '#fff',
          },
          secondary: {
            main:'#d9304e'
          }
        },
      }),
    [themeColor],
  );

  useEffect(() => {
    if(themeColor == "dark")
      document.body.classList.add('dark');
    else
      document.body.classList.remove('dark');
  }, [themeColor]);

  return (
    <section className={cn("h-screen min-h-[680px] max-h-screen dark:bg-zinc-950	flex flex-col items-center justify-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 dark:after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] text-zinc-600 dark:text-zinc-200")}>
      <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'left', vertical: 'top' }} autoHideDuration={2000}>
            {children}
          </SnackbarProvider>
      </ThemeProvider>
    </section>
  )
}