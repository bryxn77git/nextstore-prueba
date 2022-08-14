import NextLink from 'next/link'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Link, Typography } from "@mui/material"
import { ItemCounter } from '../ui'

import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQuery, useTheme } from "@mui/material";
import { FC, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart';
import { ICartProduct, IOrderItem } from '../../interfaces';

interface Props {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext( CartContext );
    const [dialog, setDialog] = useState(false)

    const theme = useTheme();
    const windowSize = useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column-reverse';

    const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number ) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const deleteProductFomCart = ( product: IOrderItem ) => {
        if (confirm('Desea eliminar el producto de la cotización')) {
            removeCartProduct( product ) 
        }    
    }

    const productsToShow = products ? products : cart;

  return (

    <>
        <Grid container spacing={2} sx={{ mb: 3 }} >
            <Grid item xs={3}>
                <Typography variant='body1' fontWeight={600} color='text.secondary'>IMAGEN</Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography variant='body1' fontWeight={600} color='text.secondary'>INFORMACIÓN</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='body1' fontWeight={600} color='text.secondary'>CANTIDAD</Typography>
            </Grid>

         </Grid>
        


        {
            hasMounted && productsToShow.map( product => (
            
                <Grid container spacing={2} key={product.slug + product.talla + product.color?.color} sx={{ mb: 1 }}>
                    <Grid item xs={3} display='flex' justifyContent='center'>
                        {/* TODO llevar a la pagina del producto */}
                        <NextLink href={`/producto/${product.slug}`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={ `${ product.img }` }
                                        component='img'
                                        sx={{ borderRadius: '5px', maxWidth: 100 }}
                                    />
                                </CardActionArea>


                            </Link>
                        </NextLink>

                    </Grid>
                    <Grid item xs={5}>
                        <Box display='flex' flexDirection='column'>
                            <Typography color='text.secondary' variant='body1' sx={{ mb: 1}}><strong>{ product.title[0].toUpperCase() + product.title.slice(1) }</strong></Typography>
                            <Typography color='text.secondary' variant='body1'>Talla: <strong>{ product.talla }</strong></Typography>
                            <Grid item display='flex' alignItems='center'>
                                <Typography color='text.secondary' variant='body1'>Color: <strong>{ product.color?.nombre }</strong></Typography>
                                <Avatar sx={{ bgcolor: product.color?.color, width: 20, height: 20, border: '2px solid #666666', ml: 1 }}>
                                    {''}
                                </Avatar>
                            </Grid>
     
                        </Box>
                    </Grid>
                    <Grid item xs={4} display='flex' alignItems='center' flexDirection={windowSize}>
                        <Grid item xs={12} md={8}>

                            {
                                editable 
                                ? (
                                    <Box display='flex' alignItems='center'>
                                        <ItemCounter 
                                            currentValue={ product.quantity }
                                            updateQuantity={ ( value ) => onNewCartQuantityValue(product, value) }
                                        />

                                    </Box>
                                )
                                : <Typography variant='subtitle1' color='text.secondary'>{ product.quantity } { product.quantity > 1 ? 'productos': 'producto'}</Typography>
                            }
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {
                                editable && (
                                    <IconButton
                                        onClick={ () => deleteProductFomCart( product )}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )
                            }
                            
                        </Grid>

                    </Grid>

                    

                </Grid>
            
                
            ))
        }
    </>
    
  )
}
