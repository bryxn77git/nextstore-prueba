import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next'

import { Link, Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { useMediaQuery, useTheme } from "@mui/material";


import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { getSession } from 'next-auth/react';
import { IOrder } from '../../interfaces/order';
import { dbOrders } from '../../database';
import { TitleUi } from '../../components/ui/TitleUi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';

//19
interface Props {
    order: IOrder;
}
//19
const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;
    const theme = useTheme();
    const subTitleSize = useMediaQuery(theme.breakpoints.up('sm')) ? 'h6' : 'subtitle2';

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

    
  return (
    <ShopLayout title={`Resumen de la cotización ${order._id}`}  pageDescription={'Resumen de la cotización'}>
        {/* <Typography variant='h1' component='h1'>Cotización: { order._id }</Typography> */}
        {/* <TitleUi title={`Cotización: ${ order._id }`} /> */}
        <Grid minHeight='calc(100vh - 200px)'>

            
        <Typography variant={subTitleSize} color='text.secondary' fontWeight='600' sx={{ mb: 1, pt: 3}}>Cotización ID: { order._id }</Typography>

       {
            statusChip(order.status) 
       }
      

        <Grid container className='fadeIn'>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList products={ order.orderItems }/>
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        {/* <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography> */}
                        <Typography color='text.secondary' fontWeight='600' >Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1' color='text.secondary'>Información del cliente</Typography>
                        </Box>

                        
                        <Typography color='text.secondary'>{ shippingAddress.name } { shippingAddress.lastname }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.address }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.state }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.phone }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.company }</Typography>
                        <Typography color='text.secondary'>{ shippingAddress.commnets }</Typography>
{/* 
                        <Divider sx={{ my:1 }} />

                        <OrderSummary orderValues={{
                            numberOfItems: order.numberOfItems,
                        }}/> */}


                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </Grid>



    </ShopLayout>
  )
}


//19
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if ( order.user !== session.user._id ) {
        return {
            redirect: {
                destination: '/orders/history',
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