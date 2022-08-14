import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, CardMedia, Divider, Grid, IconButton, Input, InputAdornment, Link, Toolbar, Typography, Tooltip } from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useState } from 'react';
import { UiContext } from '../../context';
import { useRouter } from 'next/router';
import ClearIcon from '@mui/icons-material/Clear';
import { ProductCategories } from '../products/ProductCategories';
import { CartContext } from '../../context/cart/CartContext';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

const menuOptions = [
    [ 'Inicio', '/' ],
    [ 'Productos', '/productos' ],
    [ 'Nosotros', '/nosotros' ],
    [ 'Contacto', '/contacto' ],
    [ 'Ubicación', '/ubicacion' ],
    [ 'Catálogos', '/catalogos' ],
]

export const Navbar = () => {


    const { asPath, push  } = useRouter();
    const { toggleSideMenu, toggleCategoriesMenu, isCategoriesMenuOpen, toggleCategoriesMenuClosed } = useContext( UiContext );
    const { numberOfItems } = useContext( CartContext );
    // const [categoriesMenu, setCategoriesMenu] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/buscar/${ searchTerm }`);
        setSearchTerm('');
        setIsSearchVisible(false);
    }

    const handleShowCategoriesMenu = () => {
        toggleCategoriesMenu()
    }

  return (
    
    <>
    
    <AppBar position="fixed">
        <Toolbar>

            <a href='https://wa.me/5216142161458' target='_blank' rel="noreferrer">
                <Tooltip title="Whatsapp" arrow>
                    <IconButton sx={{display: { xs: 'none', sm: 'block'}}}><WhatsAppIcon /></IconButton>
                </Tooltip>
            </a>
            <a href='https://www.facebook.com/NextStoreUniforms' target='_blank' rel="noreferrer">
                <Tooltip title="Facebook" arrow>
                    <IconButton sx={{display: { xs: 'none', sm: 'block'}}}><FacebookIcon /></IconButton>
                </Tooltip>
            </a>
            <a href='https://www.instagram.com/nextstorecuu/' target='_blank' rel="noreferrer">
                <Tooltip title="Instagram" arrow>
                    <IconButton sx={{display: { xs: 'none', sm: 'block'}}}><InstagramIcon /></IconButton>
                </Tooltip>
            </a>
            <a href='https://www.google.com/maps?ll=28.636924,-106.092774&z=22&t=m&hl=es&gl=US&mapclient=apiv3&cid=9204059629743883856' target='_blank' rel="noreferrer">
                <Tooltip title="Ubicación" arrow>
                    <IconButton sx={{display: { xs: 'none', sm: 'block'}}}><LocationOnIcon /></IconButton>
                </Tooltip>
            
            </a>
            
            

            <Box flex={ 1 } sx={{display: { xs: 'none', sm: 'block'}, height: 81.708}}/>
 
            <NextLink href="/" passHref>
                <Link>
                    <CardMedia
                        component='img'
                        className='fadeIn'
                        alt='Logo Next Store Uniforms'
                        image='/assets/nextstorelogoborde.png'
                        sx={{ width: 170, display: isSearchVisible ? 'none' : 'block' }}
                    />  
                </Link>
            </NextLink>         

            <Box flex={ 1 }/>
            <IconButton sx={{display: { xs: 'none', sm: 'block'}}} disabled><ClearIcon sx={{ color: '#ffffff'}}/></IconButton>


            {/* Pantallas pantallas grandes */}
            {
                    isSearchVisible 
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={ onSearchTerm }
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                
                            />
                        )
                    : 
                    (
                        <Tooltip title="Buscar" arrow>
                            <IconButton 
                                onClick={ () => setIsSearchVisible(true) }
                                className="fadeIn"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                    )
                }


                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchIcon />
                </IconButton>


                <NextLink href="/carrito" passHref>
                    <Link>
                        <Tooltip title="Cotización" arrow>
                            <IconButton>
                                <Badge badgeContent={ numberOfItems } color="secondary">
                                    <RequestQuoteIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </NextLink>
                
            <Tooltip title="Menú" arrow>

                <IconButton onClick={ toggleSideMenu }><MenuIcon /></IconButton>
            </Tooltip>

        </Toolbar>

        <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
            <Divider />
            
            <Toolbar variant='dense'>
                <Box flex={ 1 }/>
                    <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
                        {
                            menuOptions.map( option => {
                                if( option[0] !== 'Productos'){
                                    return (
                                        <NextLink href={ option[1] } passHref key={ option[0] }>
                                            <Link sx={{ ml: { sm: 1, md: 3}, mr: { sm: 1, md: 3} }}>
                                                <Button 
                                                    variant='text' 
                                                    size='small'
                                                    onClick={ () => toggleCategoriesMenuClosed() }
                                                    color={ asPath === option[1] ? 'secondary' : 'primary'}
                                                >
                                                    { option[0] }
                                                </Button>
                                            </Link>
                                        </NextLink>
                                    )
                                }else {
                                    return (
                                        <Button 
                                            key={ option[0] }
                                            sx={{ ml: { sm: 1, md: 3}, mr: { sm: 1, md: 3} }}
                                            variant='text' 
                                            size='small'
                                            onClick={ handleShowCategoriesMenu }
                                            color={ asPath === option[1] ? 'secondary' : 'primary'}
                                        >
                                            { option[0] }
                                        </Button>
                                    )
                                }

                            })
                        }      
                    </Box>
                <Box flex={ 1 }/>
            </Toolbar>
        </Box>

    </AppBar>

    <Grid item xs={12}>
        {
            isCategoriesMenuOpen && ( <ProductCategories /> )
        }

    </Grid>
    </>

  )
}
