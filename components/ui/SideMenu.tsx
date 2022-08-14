import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Grid } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import BusinessIcon from '@mui/icons-material/Business';
import CallIcon from '@mui/icons-material/Call';
import MapIcon from '@mui/icons-material/Map';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useContext, useState } from "react";
import { UiContext } from "../../context";
import { useRouter } from "next/router";
import { AuthContext } from '../../context/auth/AuthContext';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { SideMenuCategorias } from './SideMenuCategories';
import { Home } from "@mui/icons-material";

const navbarOptions = [
    { title: 'Inicio', src: '/', icon: <Home /> },
    { title: 'Productos', src: '/productos', icon: <InventoryIcon /> },
    { title: 'Nosotros', src: '/nosotros', icon: <BusinessIcon /> },
    { title: 'Contacto', src: '/contacto', icon: <CallIcon /> },
    { title: 'Ubicación', src: '/ubicacion', icon: <MapIcon /> },
    { title: 'Catalogos', src: '/catalogos', icon: <MenuBookIcon /> },
]



export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu, toggleSideMenuCategoriesOpen } = useContext( UiContext );
    const { user, isLoggedIn, logout } = useContext( AuthContext )
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/buscar/${ searchTerm }`);
        setSearchTerm('');
    }

    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }

    const textFieldInputFocus = (inputRef: any) => {
        if (inputRef && inputRef.node !== null) {
          setTimeout(() => {
            inputRef.focus()
          }, 100)
        }
        return inputRef
      }
      let textFieldProps = { inputRef: textFieldInputFocus } 


  return (
    <>
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(1px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 1 }}>
            
            <List>
                <ListItem>
                    <Input
                        {...textFieldProps}
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={ onSearchTerm } > 
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <Box textAlign='center'>
                    <a href='https://wa.me/5216142161458' target='_blank' rel="noreferrer">
                        <IconButton sx={{display: { xs: '', sm: 'none' }}}><WhatsAppIcon /></IconButton>
                    </a>
                    <a href='https://www.facebook.com/NextStoreUniforms' target='_blank' rel="noreferrer">
                        <IconButton sx={{display: { xs: '', sm: 'none' }}}><FacebookIcon /></IconButton>
                    </a>
                    <a href='https://www.instagram.com/nextstorecuu/' target='_blank' rel="noreferrer">
                        <IconButton sx={{display: { xs: '', sm: 'none' }}}><InstagramIcon /></IconButton>
                    </a>
                    <a href='https://www.google.com/maps?ll=28.636924,-106.092774&z=22&t=m&hl=es&gl=US&mapclient=apiv3&cid=9204059629743883856' target='_blank' rel="noreferrer">
                        <IconButton sx={{display: { xs: '', sm: 'none' }}}><LocationOnIcon /></IconButton>
                    </a>
                    
                    
                    
                </Box>  

                <Divider sx={{display: { xs: '', sm: 'none' }}} />
                
                {
                    isLoggedIn && (
                        <>
                            {/* <ListItem 
                                button
                                onClick={ () => navigateTo( '/perfil' )}
                            >
                                <ListItemIcon>
                                    <AccountCircleIcon/>
                                </ListItemIcon>
                                <ListItemText secondary={'Perfil'} />
                            </ListItem> */}

                            <ListItem 
                                button
                                onClick={ () => navigateTo( '/orders/history' )}
                            >
                                <ListItemIcon>
                                    <ReceiptLongIcon />
                                </ListItemIcon>
                                <ListItemText secondary={'Mis Órdenes'} />
                            </ListItem>

                        </>
                    )
                }

                {
                    navbarOptions.map( option => {
                        if( option.title !== 'Productos'){
                            return (
                                <ListItemButton sx={{ display: { xs: '', sm: 'none' }}} key={ option.title } onClick={ () => navigateTo( option.src ) }>
                                    <ListItemIcon>
                                        { option.icon }
                                    </ListItemIcon>
                                    <ListItemText secondary={ option.title } />
                                </ListItemButton>

                            )
                        } else {
                            return (
                                <ListItemButton sx={{ display: { xs: '', sm: 'none' }}} key={ option.title } onClick={ () => toggleSideMenuCategoriesOpen() }>
                                    <ListItemIcon>
                                        { option.icon }
                                    </ListItemIcon>
                                    <ListItemText secondary={ option.title } />
                                </ListItemButton>

                            )
                        }
                    })
                }
                
                

                {
                    isLoggedIn ? (
                        <ListItem button onClick={ logout }>
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText secondary={'Salir'} />
                        </ListItem>
                    ) : (
                        <ListItem button
                            onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }
                        >
                            <ListItemIcon>
                                <VpnKeyIcon/>
                            </ListItemIcon>
                            <ListItemText secondary={'Ingresar'} />
                        </ListItem>
                        

                    )
                }

                

                {/* Admin */}
                {
                    user?.role === 'admin' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItemButton onClick={ () => navigateTo('/admin')}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText secondary='Dashboard' />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/categories')}>
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText secondary={ 'Categorias' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/brands')}>
                                <ListItemIcon>
                                    <LocalOfferIcon />
                                </ListItemIcon>
                                <ListItemText secondary={ 'Marcas' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/products')}>
                                <ListItemIcon>
                                    <InventoryIcon /> 
                                </ListItemIcon>
                                <ListItemText secondary={ 'Productos' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/orders')}>
                                <ListItemIcon>
                                    <ReceiptLongIcon />
                                </ListItemIcon>
                                <ListItemText secondary={ 'Cotizaciónes' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/catalogos')}>
                                <ListItemIcon>
                                    <MenuBookIcon />
                                </ListItemIcon>
                                <ListItemText secondary={ 'Catálogos' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/ads')}>
                                <ListItemIcon>
                                    <ViewCarouselIcon />
                                </ListItemIcon>
                                <ListItemText secondary={ 'Publicidad' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/users')}>
                                <ListItemIcon>
                                    <PeopleAltIcon /> 
                                </ListItemIcon>
                                <ListItemText secondary={ 'Usuarios' } />
                            </ListItemButton>
                            
                            
                              
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
    
    <SideMenuCategorias />
    
    </>
  )
}