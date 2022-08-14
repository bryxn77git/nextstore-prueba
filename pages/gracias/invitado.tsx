import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Box, Typography } from '@mui/material';
import { LinkButton } from '../../components/ui';
import { useEffect, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';


const InvitadoGraciasPage = () => {

  const { completeOrderInvitado } = useContext(CartContext)

  useEffect(() => {
    completeOrderInvitado()
  }, [])
  

  return (
    <ShopLayout title='Solicitud enviada' pageDescription='Solicitud enviada con éxito'>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: 'column', p: 1 }}
        >
  
            <Typography color='primary' variant='h1' component='h1' fontSize={90} fontWeight={400}>Gracias</Typography>
            <Typography  color='text.secondary' sx={{ pb: 1 }}>Tu solicitud de cotización fue enviada con éxito, muy pronto nos pondremos en contacto contigo, para más información revisa tu correo</Typography>
            <LinkButton href={'/'} title={'Regresar'} size={16}/>

        </Box>
    </ShopLayout>
  )
}

export default InvitadoGraciasPage