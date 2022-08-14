import { GetServerSideProps, NextPage } from 'next';

import { Box, Card, CardContent, Divider, Grid, Typography, Chip, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { CartList, OrderSummary } from '../../../components/cart';

import { dbOrders } from '../../../database';
import { ICategorias, IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';
import { useState, useEffect } from 'react';
import { nextStoreApi } from '../../../api';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {


    const { shippingAddress } = order;
    const [ orderState, setOrderState ] = useState<string>('');

    useEffect(() => {
        if (order.status) {
            setOrderState(order.status);
        }
      }, [order])

    const statusChip = ( status: string ) => {

        switch (status) {
            case 'pendiente':
                return (
                    <Chip 
                        sx={{ my: 2 }}
                        label="Cotización pendiente"
                        variant='outlined'
                        color="error"
                        icon={ <ErrorIcon /> }
                    />
                )
            case 'en proceso':
                return (
                    <Chip 
                        sx={{ my: 2 }}
                        label="Cotización en proseso"
                        variant='outlined'
                        color="warning"
                        icon={ <PendingIcon /> }
                    />
                )
            case 'finalizado':
                return (
                    <Chip 
                        sx={{ my: 2 }}
                        label="Cotización finalizada"
                        variant='outlined'
                        color="success"
                        icon={ <CheckCircleIcon /> }
                    />
                )
        
            default:
                return (<></>);
        }
    }

    const onStateUpdated = async( newStatus: string ) => {

        console.log(newStatus)
        setOrderState(newStatus);

        try {
            
            await nextStoreApi.put('/admin/orders', {  orderId: order._id , status: newStatus });

        } catch (error) {
            setOrderState( order.status );
            console.log(error);
            alert('No se pudo actualizar el estatus de la cotización');
        }

    }


  return (
    <AdminLayout 
        title='Resumen de la cotización' 
        subTitle={ `Cotización Id: ${ order._id }`}
        icon={ <AirplaneTicketOutlined /> }
    >
        <>

        { 
            statusChip(orderState)                
        }

        

        <Grid container className='fadeIn'>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList products={  order.orderItems } />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='subtitle1'  color='text.secondary'>Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos': 'producto'})</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1' color='text.secondary'>Dirección del cliente</Typography>
                        </Box>

                        
                        <Typography color='text.secondary'>{ shippingAddress.name } { shippingAddress.lastname }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.address }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.state }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.phone }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.company }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.commnets }</Typography>

                        <Divider sx={{ my:1 }} />


                        {/* <OrderSummary 
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                            }} 
                        />

                        <Divider sx={{ my:1 }} /> */}

                    <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                            {/* TODO actualizar el estatus de la Cotización con el select */}

                            <FormControl>
                                <InputLabel id="demo-multiple-name-label">Estatus</InputLabel>
                                <Select
                                    value={orderState}
                                    onChange={ ({ target }) => onStateUpdated( target.value ) }
                                    input={<OutlinedInput label="Name" />}
                                    // MenuProps={MenuProps}
                                >
                                
                                <MenuItem value={'pendiente'}>Pendiente</MenuItem>
                                <MenuItem value={'en proceso'}>En proseso</MenuItem>
                                <MenuItem value={'finalizado'}>Finalizado</MenuItem>
                           
                                </Select>
                            </FormControl>

                            {/* <Box display='flex' flexDirection='column'>
                                {
                                    order.isPaid
                                    ? (
                                        <Chip 
                                            sx={{ my: 2, flex: 1 }}
                                            label="Cotización ya fue pagada"
                                            variant='outlined'
                                            color="success"
                                            icon={ <CreditScoreOutlined /> }
                                        />

                                    ):(
                                        <Chip 
                                            sx={{ my: 2, flex: 1 }}
                                            label="Pendiente de pago"
                                            variant='outlined'
                                            color="error"
                                            icon={ <CreditCardOffOutlined /> }
                                        />
                                    )
                                }
                            </Box> */}

                        </Box>

                    

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        
        </>

    </AdminLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
    const order = await dbOrders.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/admin/orders',
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}


export default OrderPage;