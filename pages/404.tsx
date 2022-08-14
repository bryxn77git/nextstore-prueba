import { Box, Divider, Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'


const Custom404 = () => {
  return (
    <ShopLayout title='Página no encontrada' pageDescription='No hay nada que mostrar aqui'>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row'}, }}
        >
            <Typography color='primary' variant='h1' component='h1' fontSize={90} fontWeight={400}>404 |</Typography>
            <Typography marginLeft={ 2 } color='text.secondary' >La página no se encuentra o fue removida de Next Store</Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404