import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CardMedia, Grid, Avatar, Box, CardActionArea, IconButton, Typography } from '@mui/material';
import { useRouter } from "next/router";
import { FC, useContext } from 'react';
import { UiContext } from "../../context";
import { ICartProduct } from "../../interfaces";
import { ItemCounter } from '../ui';

interface Props {
    product: ICartProduct,
}

export const ProductAddedToCart: FC<Props> = ({ product }) => {

    const router = useRouter();
    const { isDialogProductAddedOpen, toggleDialogProductAdded } = useContext( UiContext )


    const handleClickCart = () => {
        toggleDialogProductAdded();
        router.push('/carrito');
    };
    
      const handleClose = () => {
        toggleDialogProductAdded();
      };

  return (
    <Dialog
        open={isDialogProductAddedOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
            { product.quantity > 1 ? 'Productos agregados': 'Producto agregado'}
          
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={4} display='flex' justifyContent='center'>
                        {/* TODO llevar a la pagina del producto */}
                       <CardActionArea>
                            <CardMedia 
                                image={ `${ product.img }` }
                                component='img'
                                sx={{ borderRadius: '5px', maxWidth: 100 }}
                            />
                        </CardActionArea>

                    </Grid>
                    <Grid item xs={8}>
                        <Box display='flex' flexDirection='column'>
                            <Typography color='text.secondary' variant='body1' sx={{ mb: 1}}><strong>{ product.title[0].toUpperCase() + product.title.slice(1) }</strong></Typography>
                            <Typography color='text.secondary' variant='body1'>Talla: <strong>{ product.talla }</strong></Typography>
                            <Grid item display='flex' alignItems='center'>
                                <Typography color='text.secondary' variant='body1'>Color: <strong>{ product.color?.nombre }</strong></Typography>
                                <Avatar sx={{ bgcolor: product.color?.color, width: 20, height: 20, border: '2px solid #666666', ml: 1 }}>
                                    {''}
                                </Avatar>

                            </Grid>
                            <Typography color='text.secondary' variant='body1'>Cantidad: <strong>{ product.quantity }</strong></Typography>
     
                        </Box>
                    </Grid>

                </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Aceptar</Button>
          <Button onClick={handleClickCart} autoFocus>
            Ir a la cotización
          </Button>
        </DialogActions>
      </Dialog>
  )
}
