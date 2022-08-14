import NextLink from 'next/link'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList } from '../../components/cart';
import { ShopLayout } from "../../components/layouts"
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart/CartContext';
import { OrderSummary } from '../../components/cart/OrderSummary';
import Cookies from 'js-cookie';
import nextStoreApi from '../../api/nextStoreApi';
import { FullScreenLoading } from '../../components/ui';



const SummaryPage = () => {

    const router = useRouter();

    const { numberOfItems, shippingAddress, createOrder } = useContext( CartContext );

    const [ isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if( !Cookies.get('name') ){
            router.push('/checkout/address')
        }
    }, [ router ])

    const onCreateOrder = async() => {
        setIsPosting(true); // 19

        const { hasError, message } = await createOrder();

        if( hasError ){
            setIsPosting(false);
            setErrorMessage( message );
            return;
        }

        try {
            const resp = await nextStoreApi.post('/emails/order', { url: `${process.env.NEXT_PUBLIC_HOST_NAME}admin/orders/${message}`});

            if(resp.data.message === 'error'){
                return alert('Error al enviar el mensaje')
            }
            
        } catch (error) {
            setIsPosting(false)
            alert('Error al enviar el formulario')
        }

        

        router.replace(`/orders/${ message }`)
    }

    if(!shippingAddress) {
        return <></>
    }

    const { address, city, lastname, name, phone, state, commnets = '', company = '', zip  } = shippingAddress; 


  return (
    <>

        <ShopLayout title={`Cotización - ${numberOfItems}`} pageDescription={'Carrito de cotización de la tienda'} >
            {
                !isPosting ? (

                <Grid container justifyContent='center' className='main-grid'>

                    <Grid
                        container
                        sx={{ pt: {xs: 1, md: 2},  flexDirection: 'column', p: 1  }}
                        // display='flex' 
                        // justifyContent='center'
                        
                        minHeight='calc(100vh - 200px)'
                        className="home-grid"
                    >
                        
                        <Grid container spacing={2}>

                            <Grid display='flex' sx={{ mb: 1}} item xs={12}>
                                    <Typography variant='h1' component='h1' fontSize={30} fontWeight={800} sx={{ mr: 1 }}>Resumen</Typography>
                            </Grid>
                            <Grid item xs={12} sm={7} >
        
                                {/* CartList */}
                                <CartList />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                
                                <Card elevation={3} >
                                    <CardContent>

                                        <Typography variant='h2' fontSize={16} fontWeight={600} color='text.secondary'>RESUMEN DE LA COTIZACIÓN</Typography>
                                        <Divider sx={{ my:1 }} />

                                        <Box display='flex' justifyContent='space-between'>
                                            <Typography variant='subtitle1' color='text.secondary'>Dirección</Typography>
                                            <NextLink href='/checkout/address' passHref>
                                                <Link underline='always'>
                                                    Editar
                                                </Link>
                                            </NextLink>
                                        </Box>

                                        
                                        <Typography color='text.secondary'>{ name } { lastname }</Typography>
                                        <Typography color='text.secondary'>{ address }</Typography>
                                        <Typography color='text.secondary'>{ state }, { city }, { zip }</Typography>
                                        <Typography color='text.secondary'>{ phone }</Typography>
                                        <Typography color='text.secondary'>{ company }</Typography>
                                        <Typography color='text.secondary'>{ commnets }</Typography>
                                        

                                        <Divider sx={{ my:1 }} />

                                        {/* <Typography sx={{ mt: 1, mb: 2}} variant='h2' fontSize={16} fontWeight={600} color='text.secondary'>RESUMEN DEL CARRITO</Typography> */}
                                        {/* <Divider sx={{ mt: 1, mb: 2 }}/> */}
                                        
                                        
                                            <Box display='flex' justifyContent='space-between'>
                                                <Typography variant='subtitle1' color='text.secondary'>Productos</Typography>
                                                <NextLink href='/carrito' passHref>
                                                    <Link underline='always'>
                                                        Editar
                                                    </Link>
                                                </NextLink>
                                            </Box>
                                            <OrderSummary />    
                                            <Grid item xs={12} sx={{ mt: 2}}>
                                                <Button 
                                                    fullWidth 
                                                    variant="contained" 
                                                    // href='/gracias/orden'
                                                    disabled={ isPosting ? true : false }
                                                    onClick={ onCreateOrder }
                                                >
                                                    {
                                                        isPosting ? 'Cargando...' : 'Confirmar cotización'
                                                    } 
                                                
                                                </Button>
                                            </Grid> 

                                    </CardContent>
                                </Card>
                                
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                ) : (
                    <FullScreenLoading />
            
                )
            }
        </ShopLayout>


    </>
  )
}

export default SummaryPage