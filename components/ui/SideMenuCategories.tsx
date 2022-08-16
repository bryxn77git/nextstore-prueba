import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useContext, useState } from "react";
import { UiContext } from "../../context";
import { useRouter } from "next/router";
import { AuthContext } from '../../context/auth/AuthContext';

export const SideMenuCategorias = () => {

    const router = useRouter();
    const { isMenuCategoriesOpen, toggleSideMenuCategories, toggleSideMenuCategoriesClose, categoriesMenu } = useContext( UiContext );
    const { user, isLoggedIn, logout } = useContext( AuthContext )
    const [searchTerm, setSearchTerm] = useState('');

    const navigateTo = ( url: string ) => {
        toggleSideMenuCategories();
        router.push(url);
    }

  return (
    <Drawer
        open={ isMenuCategoriesOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(1px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenuCategoriesClose }
    >
        <Box sx={{ width: 270, paddingTop: 1 }}>
            
            <List>
                {/* <ListItemButton onClick={ () => toggleSideMenuCategoriesClose() } sx={{ mb: 1}}>
                        <ListItemIcon>
                            <ArrowBackIosIcon />
                        </ListItemIcon>
                    <ListItemText secondary={ 'Volver' } />
                </ListItemButton> */}

                
                <ListItem>
                    <IconButton onClick={ () => toggleSideMenuCategoriesClose() } sx={{ mr: 1}}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography color='text.secondary' fontWeight={600}>Categorias</Typography>
                </ListItem> 

                <Divider sx={{display: { xs: '', sm: 'none' }}} />
                
                {
                    categoriesMenu.length > 0 ? (
                        categoriesMenu.map( category => {
                            return( 
                            <ListItemButton key={ category.name } onClick={ () => navigateTo( `/productos/${ category.name.toLocaleLowerCase() }` ) }>
                                <ListItemText secondary={ category.name.charAt(0).toUpperCase() + category.name.slice(1) } />
                            </ListItemButton>
                        )
                        }
                            
                        )

                    ) : (
                        <ListItemButton sx={{ display: { xs: '', sm: 'none' }}} >
                            <Typography color='text.secondary' >Cargando...</Typography>
                        </ListItemButton>
                        
                    )
                }

            </List>
        </Box>
    </Drawer>
  )
}