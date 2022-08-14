import React from 'react'
import { Grid, TextField, Button, Typography, Card, CardContent, Box } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { useForm } from 'react-hook-form';
import { TitleUi } from '../../components/ui/TitleUi';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { CartContext } from '../../context/cart/CartContext';
import { useContext, useEffect } from 'react';


type FormData = {
    name     : string;
    lastname : string;
    phone    : string;
    company  : string;
    address  : string;
    city     : string;
    state    : string;
    commnets : string;
    zip      : string;
}

const getAddressFromCookies = ():FormData => {
    return {
        name     : Cookies.get('name') || '',
        lastname : Cookies.get('lastname') || '',
        phone    : Cookies.get('phone') || '',
        company  : Cookies.get('company') || '',
        address  : Cookies.get('address') || '',
        city     : Cookies.get('city') || '',
        state    : Cookies.get('state') || '',
        commnets : Cookies.get('commnets') || '',
        zip      : Cookies.get('zip') || '',
    }
}

const Address = () => {

    const router = useRouter();
    const { updateAddress } = useContext( CartContext )

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues:  getAddressFromCookies()
    });

    useEffect(() => {
        reset(getAddressFromCookies())
      }, [reset])

    const onSubmitAddress = ( data: FormData ) => {

        updateAddress( data );
        router.push('/checkout/summary')
     }

  return (
    <ShopLayout title='Dirección' pageDescription={'Dirección de la cotización de la tienda'} >
        <Grid container justifyContent='center' className='main-grid'>

            <Grid
                container
                sx={{ pt: {xs: 1, md: 2},  flexDirection: 'column', p: 1 }}
                alignItems='center' 
                minHeight='calc(100vh - 200px)'
                className="home-grid"
            >
                
                <Grid container spacing={2} display='flex' justifyContent='center'>

                    <Grid display='flex' sx={{ml: 3}} item xs={12} md={10}>
                            <TitleUi title={'Dirección'} />
                            {/* <Typography variant='h1' component='h1' fontSize={30} fontWeight={800} sx={{ mr: 1 }}>Dirección</Typography> */}
                            {/* <Typography variant='h1' component='h1' fontSize={20} fontWeight={600} color='text.secondary'>60145c27977e0ab6d0cdafbf</Typography> */}
                    </Grid>
                
                    <Grid item xs={12} md={10} >
                        <form onSubmit={ handleSubmit( onSubmitAddress ) } > 
                        <Card elevation={0} >
                            <CardContent>
                                                             
                                <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                    <Grid container spacing={1}>

                                        
                                                
                                        <Grid item xs={6}>
                                            <TextField 
                                            
                                                id="name"
                                                label="Nombre"
                                                variant="outlined"
                                                fullWidth
                                                { ...register('name', {
                                                    required: 'Este campo es obligatorio'
                                                })}
                                                error={ !!errors.name }
                                                helperText={ errors.name?.message }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                            
                                                id="lastname"
                                                label="Apellido"
                                                variant="outlined"
                                                fullWidth
                                                { ...register('lastname', {
                                                    required: 'Este campo es obligatorio'
                                                })}
                                                error={ !!errors.lastname }
                                                helperText={ errors.lastname?.message }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                            
                                                id="phone"
                                                label="Teléfono"
                                                variant="outlined"
                                                fullWidth
                                                { ...register('phone', {
                                                    required: 'Este campo es obligatorio'
                                                })}
                                                error={ !!errors.phone }
                                                helperText={ errors.phone?.message }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                            
                                                id="company"
                                                label="Empresa"
                                                variant="outlined"
                                                fullWidth
                                                { ...register('company')}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                            
                                                id="address"
                                                label="Dirección"
                                                variant="outlined"
                                                fullWidth
                                                { ...register('address', {
                                                    required: 'Este campo es obligatorio'
                                                })}
                                                error={ !!errors.address }
                                                helperText={ errors.address?.message }
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            
                                                id="zip"
                                                label="Codigo postal"
                                                variant="outlined"
                                                fullWidth
                                                { ...register('zip', {
                                                    required: 'Este campo es obligatorio'
                                                })}
                                                error={ !!errors.zip }
                                                helperText={ errors.zip?.message }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                            
                                                id="city"
                                                label="Ciudad"
                                                variant="outlined"
                                                fullWidth
                                                { ...register('city', {
                                                    required: 'Este campo es obligatorio'
                                                })}
                                                error={ !!errors.city }
                                                helperText={ errors.city?.message }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                            
                                                id="state"
                                                label="Estado"
                                                variant="outlined"
                                                fullWidth
                                                { ...register('state', {
                                                    required: 'Este campo es obligatorio'
                                                })}
                                                error={ !!errors.state }
                                                helperText={ errors.state?.message }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField 
                                                    multiline
                                                    maxRows={2}
                                                    id="commnets"
                                                    label="Comentarios"
                                                    variant="outlined"
                                                    fullWidth
                                                    { ...register('commnets')}
                                                />
                                        </Grid>

                                        <Grid item xs={12} display='flex' justifyContent='center'>
                                            <Button fullWidth variant="contained" type='submit'>Continuar</Button>
                                        </Grid> 

                                    </Grid>

                                </Box>

                            </CardContent>
                        </Card>
                        </form>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>

       
    </ShopLayout>
  )
}

export default Address