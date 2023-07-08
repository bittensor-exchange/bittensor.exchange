'use client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './tailwind.base.css'
import './globals.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import axios from 'axios';
import Provider from '@/data/provider';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            light: '#48C076',
            main: '#48C076',
            dark: '#48C076',
            contrastText: '#fff',
          },
          error: {
            main: '#d9304e',
            contrastText: '#fff',
          }
        },
      }),
    [prefersDarkMode],
  );

  return (
    <html lang="en">
      <head>
        <title>Tensor Exchange</title>
        <meta name="description" content="TAO Trade - Tensor Exchange" />
      </head>
      <body>
        <section className="dark:bg-zinc-950	flex h-screen min-h-[680px] flex-col items-center justify-center select-none before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] text-zinc-600 dark:text-zinc-200">
          <ThemeProvider theme={theme}>
            <Provider>
              {children}
            </Provider>
          </ThemeProvider>
        </section>
      </body>
    </html>
  )
}

// Register axios middleware
const onOk = (response) => {
    return response.data
}

const onError = (err) => {
    console.log('err' + err) // for debug
    return Promise.reject(err)
}

axios.interceptors.response.use(onOk, onError);
axios.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    if(token)   
        request.headers['Authorization'] = `Bearer ${token}`;
    return request;
})
