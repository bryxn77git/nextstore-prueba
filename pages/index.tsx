
import type { GetStaticProps, NextPage } from 'next'

import { Box, Divider, Grid } from '@mui/material';

import { CategoryHome, PopularProducts, SwiperBrands, SwiperHome } from '../components/home'
import { ShopLayout } from '../components/layouts'
import { FormContact, InfoCompany, Map, TitleUi } from '../components/ui';
import { dbCategories, dbImages, dbMarcas, dbProducts } from '../database';
import { ICategorias, IImages, IMarcas, IProduct } from '../interfaces';

interface Props {
  images: IImages[];
  marcas: IMarcas[];
  popularProducts: IProduct[];
  categories: ICategorias[];
}

const Home: NextPage<Props> = ({ images, marcas, popularProducts, categories }) => {


  return (
    <ShopLayout title='Next Store Uniforms - Inicio' pageDescription={'Encuentra los mejores uniformes para tu empresa'} >
    
      <Grid item xs={12} >
        <SwiperHome images={ images }/>
      </Grid> 

      <Grid container justifyContent='center' className='main-grid'>

        <Grid container item xs={12} className='home-grid'>

          <Grid item xs={12} sx={{ mb: 10 }}>
            <SwiperBrands marcas={ marcas } />
          </Grid>


          {
            popularProducts.length > 0 && (
              <PopularProducts products={ popularProducts }/>

            )
          }


          <CategoryHome categories={ categories } />

          <Grid item xs={12} sx={{ mb: 10 }}> 
            
            <Box display='flex' justifyContent='center'> 
                <TitleUi title='CONTACTO'/>  
            </Box>
            <Box display='flex' justifyContent='center'> 
                <Divider sx={{ mt: 1, width: { xs: 150, sm: 190 }, height: 5 }}/> 
            </Box>

            <Grid container spacing={2} sx={{ mt: 5 }}>
                <Grid item xs={12} md={4} display='flex' justifyContent='center'>
                  <InfoCompany />
                </Grid>

                <Grid item xs={12} md={8}>
                  <FormContact />
                </Grid>

            </Grid>
          </Grid>

          <Grid item xs={12} > 
            
            <Box display='flex' justifyContent='center'> 
                <TitleUi title='UBICACIÓN'/>  
            </Box>
            <Box display='flex' justifyContent='center'> 
                <Divider sx={{ mt: 1, width: { xs: 150, sm: 190 }, height: 5 }}/> 
            </Box>

            <Grid container spacing={2} sx={{ mt: 5 }}>
              <Grid item xs={12} display='flex' justifyContent='center'>
                  <Map />
              </Grid>
            </Grid>

          </Grid>

        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
  const images = await dbImages.getAllImagesSwiper();
  const marcas = await dbMarcas.getAllBrands();
  const popularProducts = await dbProducts.getPopularProducts();
  const categories = await dbCategories.getPrincipalCategoies();

  return {
    props: {
      images,
      marcas,
      popularProducts,
      categories
    },
    revalidate: 60 * 60 * 24
  }
}

export default Home