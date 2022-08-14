import { FC, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '../../context/cart/CartContext';

interface Props {
  orderValues?: {
      numberOfItems: number;
  }
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {

    const { numberOfItems } = useContext( CartContext );

    const summaryValues = orderValues ? orderValues : { numberOfItems };
    
  return (
    <Grid container>
                
        <Grid item xs={6}>
            <Typography color='text.secondary'>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography color='text.secondary'>{summaryValues.numberOfItems} { summaryValues.numberOfItems > 1 ? 'productos': 'producto' }</Typography>
        </Grid>        

    </Grid>
  )
}