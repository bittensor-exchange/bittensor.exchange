'use client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './tailwind.base.css'
import './globals.css'
import axios from 'axios';
import Provider from '@/data/provider';
import Theme from '@/components/theme';

const theme = typeof localStorage == "undefined" ? "dark" : localStorage.getItem("theme") == "dark" ? "dark" : "";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <title>Tensor Exchange</title>
        <meta name="description" content="TAO Trade - Tensor Exchange" />
      </head>
      <body className={'overflow-y ' + theme}>
        <Provider>
          <Theme>
            {children}
          </Theme>
        </Provider>
      </body>
    </html>
  )
}

// Register axios middleware
const onOk = (response) => {
    const token: string = (
      response.headers as { getAuthorization: Function }
    ).getAuthorization();
    if(token)
      localStorage.setItem("auth", token || "");
    return response.data
}

const onError = (err) => {
    console.log('err' + err) // for debug
    return Promise.reject(err)
}

axios.interceptors.response.use(onOk, onError);
axios.interceptors.request.use((request) => {
    const token = localStorage.getItem('auth');
    if(token)   
        request.headers['Authorization'] = token;
    return request;
})
