import { Box, Divider, Grid } from '@mui/material'
import { GetStaticProps } from 'next'
import { FC } from 'react'
import { ShopLayout } from '../../components/layouts'
import { CategoryCard, TitleUi } from '../../components/ui'
import { dbCategories } from '../../database'
import { ICategorias } from '../../interfaces'

interface Props {
    categories: ICategorias[];
}

const CategoriesPage:FC<Props> = ({ categories }) => {
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

                <Grid container sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='center'> 
                            <TitleUi title='CATEGORIAS'/>
                        </Box>
                        <Box display='flex' justifyContent='center'> 
                            <Divider sx={{ mt: 1, width: { xs: 150, sm: 215 }, height: 5, borderRadius: 90 }}/> 
                        </Box>
                    </Grid>    

                    <Grid container spacing={ 1 } sx={{ mt: 3}}>
                    
                        {
                            categories.map( ({name, image}, index) => (
                                <Grid item xs={12} md={4} lg={3} key={name}>
                                    <CategoryCard href={`/productos/${name}`} alt={name} image={image} />
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
    
    const categories = await dbCategories.getAllCategoies();
  
    return {
      props: {
        categories
      },
      revalidate: 60 * 60 * 24
    }
  }

export default CategoriesPage