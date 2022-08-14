import { Grid, Paper, Typography } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


export const InfoCompany = () => {
  return (
    <Paper elevation={3} sx={{ width: '100%', maxWidth: 500, height: 450, alignItems: 'center', display: 'flex' }}>
        <Grid
                container 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                spacing={ 3 }
        >
            <Grid item xs={3} display='flex' justifyContent='end'> 
            <MailIcon fontSize='large' color='info'/>
            </Grid>

            <Grid item xs={9} >
            <Typography variant='body1' color='text.secondary' fontWeight={600}>Correo electrónico:</Typography>
            <Typography variant='body2' color='primary' fontWeight={600}>nextstoreuniforms@gmail.com</Typography>
            </Grid>
            
            <Grid item xs={3} display='flex' justifyContent='end'> 
            <CallIcon fontSize='large' color='info'/>
            </Grid>

            <Grid item xs={9} >
            <Typography variant='body1' color='text.secondary' fontWeight={600}>Número de teléfono:</Typography>
            <Typography variant='body2' color='primary' fontWeight={600}>(614) 123-45-67</Typography>
            </Grid>

            <Grid item xs={3} display='flex' justifyContent='end'> 
            <LocationOnIcon fontSize='large' color='info'/>
            </Grid>

            <Grid item xs={9} >
            <Typography variant='body1' color='text.secondary' fontWeight={600}>Dirección:</Typography>
            <Typography variant='body2' color='primary' fontWeight={600}>Calle Bombay #1808, Col. Mirador,</Typography>
            <Typography variant='body2' color='primary' fontWeight={600}>Chihuahua, Chih.</Typography>
            </Grid>

            <Grid item xs={3} display='flex' justifyContent='end'> 
            <AccessTimeFilledIcon fontSize='large' color='info'/>
            </Grid>

            <Grid item xs={9} >
            <Typography variant='body1' color='text.secondary' fontWeight={600}>Horario::</Typography>
            <Typography variant='body2' color='primary' fontWeight={600}>Lunes a Viernes - 09:00 a.m. a 06:00 p.m.</Typography>
            <Typography variant='body2' color='primary' fontWeight={600}>Sábados - 10:00 a.m. a 02:00 p.m.</Typography>
            </Grid>  
        </Grid>
    </Paper>
  )
}
