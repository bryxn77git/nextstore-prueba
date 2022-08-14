import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Box, Typography } from '@mui/material';
import { LinkButton } from '../../components/ui';


const ContactoGraciasPage = () => {
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
            <Typography  color='text.secondary' sx={{ pb: 1 }}>Gracias por ponerte en contacto con nosotros, muy pronto nos pondremos en contacto contigo para brindarte la información que necesitas</Typography>
            <LinkButton href={'/'} title={'Regresar'} size={16}/>

        </Box>
    </ShopLayout>
  )
}

export default ContactoGraciasPage