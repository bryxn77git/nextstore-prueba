import { Box, Divider, Grid } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { FormContact, InfoCompany, TitleUi } from '../../components/ui'

import { useMediaQuery, useTheme } from "@mui/material";


const Contacto = () => {

    const theme = useTheme();
    const direccionSize = useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column-reverse';

  return (
    <ShopLayout title='Next Store Uniforms - Inicio' pageDescription={'Encuentra los mejores uniformes para tu empresa'} >
    

        <Grid container justifyContent='center' className='main-grid'>

            <Grid
                container
                sx={{ pt: {xs: 1} }} 
                display='flex' 
                justifyContent='center'
                className="home-grid"
            >

                <Grid item xs={12} sx={{ mt: { xs: 3, md: 5} }}>

                    <Box display='flex' justifyContent='center'> 
                        <TitleUi title='CONTACTANOS'/>  
                    </Box>
                    <Box display='flex' justifyContent='center'> 
                        <Divider sx={{ mt: 1, width: { xs: 150, sm: 255 }, height: 5 }}/> 
                    </Box>

                    <Grid container spacing={2} sx={{ mt: { xs: 1, sm: 5} }} direction={direccionSize}>
                        <Grid item xs={12} md={4} display='flex' justifyContent='center' >
                            <InfoCompany />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <FormContact />
                        </Grid>

                    </Grid>
                </Grid>

              

            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default Contacto