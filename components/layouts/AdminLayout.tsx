import { FC, PropsWithChildren } from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';
import { useMediaQuery, useTheme } from "@mui/material";

import { Navbar, SideMenu } from '../ui';
import { TitleUi } from '../ui/TitleUi';
import Head from 'next/head';


interface Props {
    title: string;
    subTitle: string;
    icon?: JSX.Element;
}

export const AdminLayout:FC<PropsWithChildren<Props>> = ({ children, title, subTitle, icon }) => {

    const theme = useTheme();
    const showToolbar = useMediaQuery(theme.breakpoints.up('sm')) ? '130px auto 80px auto' : '80px auto';
    const subTitleSize = useMediaQuery(theme.breakpoints.up('sm')) ? 'h6' : 'subtitle2';

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

        <nav>
            <Navbar />
        </nav>

        <main style={{
            margin: showToolbar,
            maxWidth: '1536px',
            padding: '0px 5px',
        
        }}> 

        <SideMenu />

            <Box display="flex" flexDirection='column'  sx={{ pt: 3, width: '100%', textAlign: 'center' }}  >

                    <TitleUi title={title} />
                    <Typography variant={subTitleSize} color='text.secondary' fontWeight='600' sx={{ mb: 1}}>{ subTitle }</Typography>

                    

                {/* <Typography 
                    sx={{ mt: 3}} 
                    variant='h1' 
                    component='h1' 
                    fontSize={30} 
                    fontWeight={800} 
                    // color='text.secondary'
                >
                    { icon }
                    {' '} { title }
                </Typography> */}
                {/* <Typography 
                    variant='h2' 
                    sx={{ mb: 1, mt: 1 }}
                    fontSize={20} 
                    fontWeight={600} 
                    color='text.secondary'
                >
                    { subTitle }
                </Typography> */}

            </Box>

            <Box className='fadeIn'>
                { children }
            </Box>

        </main>


    </>
  )
}