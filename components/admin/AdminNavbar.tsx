import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography, CardMedia } from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { UiContext } from '../../context/ui/UiContext';


export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext( UiContext );
    

    return (
        <AppBar position="fixed">
        <Toolbar>

            {/* <a href='/' target='_blank' >
                <IconButton sx={{display: { xs: 'none', sm: 'block'}}}><WhatsAppIcon /></IconButton>
            
            </a> */}
            <a href='https://www.facebook.com/NextStoreUniforms' target='_blank' rel="noreferrer">
                <IconButton sx={{display: { xs: 'none', sm: 'block'}}}><FacebookIcon /></IconButton>
            
            </a>
            <a href='https://www.instagram.com/nextstorecuu/' target='_blank' rel="noreferrer">
                <IconButton sx={{display: { xs: 'none', sm: 'block'}}}><InstagramIcon /></IconButton>
            
            </a>
            <a href='https://www.google.com/maps?ll=28.636924,-106.092774&z=22&t=m&hl=es&gl=US&mapclient=apiv3&cid=9204059629743883856' target='_blank' rel="noreferrer">
                <IconButton sx={{display: { xs: 'none', sm: 'block'}}}><LocationOnIcon /></IconButton>
            
            </a>
            
            

            <Box flex={ 1 } sx={{display: { xs: 'none', sm: 'block'}, height: 81.708}}/>
 
            <NextLink href="/" passHref>
                <Link>
                    <CardMedia
                        component='img'
                        className='fadeIn'
                        alt='Logo Next Store Uniforms'
                        image='/assets/nextstorelogoborde.png'
                        sx={{ width: 170, display: 'block' }}
                    />  
                </Link>
            </NextLink>         

            <Box flex={ 1 }/>

                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchIcon />
                </IconButton>


            <IconButton onClick={ toggleSideMenu }><MenuIcon /></IconButton>


        </Toolbar>

    </AppBar>
    )
}