import NextLink from "next/link"
import { Box, Button, Card, CardMedia, Grid, Link, Typography } from "@mui/material"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export const Footer = () => {
  return (
    <Box sx={{ height: { xs: 'auto', md: 250}, backgroundColor: '#C2BB4F', alignItems: 'center', display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
      <Grid container sx={{ maxWidth: '1536px', mt: 3, mb: 3}} spacing={3}>
        <Grid item xs={ 12 } sm={ 6 } md={ 3 } display='flex' justifyContent='center'>
          <NextLink href='/' passHref>
            <Link>
              <Card sx={{ borderRadius: 600 }} elevation={0}>
                <CardMedia
                  component='img'
                  image='/assets/logocircular.jpeg'
                  alt='Logo next store'
                  sx={{ width: 180 }}
                />
              </Card>
            </Link>
          </NextLink>
        </Grid>

        <Grid container item xs={ 12 } sm={ 6 } md={ 3 } spacing={1}>
          <Grid item xs={12} >  
            <Typography variant='subtitle1'>Contacto:</Typography>
            <Typography variant='subtitle2'>(614) 216-14-58</Typography>
            <Typography variant='subtitle2'>nextstoreuniforms@gmail.com</Typography>  
          </Grid>
          <Grid item xs={12}>
            {/* TODO OnClick para llevar a cada pagina */}
            <NextLink href='/' passHref>
              <Link>
                <Typography variant='subtitle1'>Políticas de privacidad</Typography>
              </Link>
            </NextLink>
            <NextLink href='/' passHref>
              <Link>
                <Typography variant='subtitle1'>Términos y condiciones</Typography>
              </Link>
            </NextLink>

          </Grid>
        </Grid>

        <Grid container item xs={ 12 } sm={ 6 } md={ 3 } spacing={1}>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>Horario:</Typography>
            <Typography variant='subtitle2'>Lunes a Viernes de 9 a 18hrs</Typography>
            <Typography variant='subtitle2'>Sábados a 10 a 14hrs</Typography>  
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>Ubicación:</Typography>
            <Typography variant='subtitle2'>Calle Bombay #1808, Col. Mirador,</Typography>
            <Typography variant='subtitle2'>Chihuahua, Chih.</Typography>
          </Grid>
        </Grid>

        <Grid container item xs={ 12 } sm={ 6 } md={ 3 } >
          <Grid item xs={12} >
              {/* TODO asignar url a cada boton */}
              <Typography variant='subtitle1'>Encuentranos en:</Typography>
               
              <a href='https://wa.me/5216142161458' target='_blank' rel="noreferrer" style={{ textDecoration: 'none'}}>
                <Button variant="contained" startIcon={<WhatsAppIcon />}>
                    Whatsapp
                </Button><br />
              </a>
              <a href='https://www.facebook.com/NextStoreUniforms' target='_blank' rel="noreferrer" style={{ textDecoration: 'none'}}>
                <Button variant="contained" startIcon={<FacebookIcon />}>
                  Facebook
                </Button><br />
              </a>
              <a href='https://www.instagram.com/nextstorecuu/' target='_blank' rel="noreferrer" style={{ textDecoration: 'none'}}>
                <Button variant="contained" startIcon={<InstagramIcon />}>
                  Instagram
                </Button>
              </a>
  
          </Grid>
        </Grid>

      </Grid>
    </Box>
  )
}
