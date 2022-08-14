import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Grid, Box, Divider, Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import { TitleUi } from '../../components/ui/TitleUi';
import { GetStaticProps } from 'next';
import { dbCatalogos } from '../../database';
import { ICatalogos } from '../../interfaces/catalogos';
import { FC } from 'react';

interface Props {
    catalogos: ICatalogos[]
}

const Catalogos: FC<Props> = ({ catalogos }) => {
  return (
    <ShopLayout title='Catálogos' pageDescription={'Catálogos de varias marcas'} >
         
         <Grid container justifyContent='center' className='main-grid'>

            <Grid
                container
                sx={{ pt: {xs: 1} }} 
                display='flex' 
                justifyContent='center'
                className="home-grid"
                minHeight='calc(100vh - 200px)'
            >

                <Grid container sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='center'> 
                            <TitleUi title='CATALOGOS'/>
                        </Box>
                        <Box display='flex' justifyContent='center'> 
                            <Divider sx={{ mt: 1, width: { xs: 119, sm: 200 }, height: 5, borderRadius: 90 }}/> 
                        </Box>
                    </Grid>    

                    <Grid container spacing={ 2 } sx={{ mt: 3}}>

                        {
                            catalogos.map( ({name, image, url}, index) => (
                                <Grid item xs={6} md={3} key={index}>
                                    <Card sx={{ textAlign: 'center'}}>
                                    <a href={ url } target="_blank" rel="noreferrer" >
                                        
                                            <CardActionArea>
                                                <CardMedia
                                                component='img'
                                                image={ image }
                                                alt={ name }
                                                sx={{ maxHeight: 400}}
                                                className="img-zoom-category"
                                                />
                                                <Typography 
                                                    variant="h4" 
                                                    fontWeight={800} 
                                                    sx={{
                                                        position: "absolute", 
                                                        color: "white",
                                                        top: "40%",
                                                        left: "50%",
                                                        transform: "translateX(-50%)",
                                                    }} 
                                                >
                                                    { name.toUpperCase() }
                                                </Typography>
                                            </CardActionArea>
                                            
                                        
                                        </a>
                                    </Card>
                                </Grid>
                            ))
                        }
                        
                    </Grid>
            
                </Grid>

            </Grid>
        </Grid>

        
    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const catalogos = await dbCatalogos.getAllCatalogos();
    
    return {
      props: {
        catalogos
      },
      revalidate: 60 * 60 * 24
    }
  }


export default Catalogos