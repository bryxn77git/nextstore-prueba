import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';

interface Props {
    title: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
            />  
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />  
        </Head>

        <main>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{ pt:5 }}>   
                { children }
            </Box>
        </main>
    
    </>
  )
}