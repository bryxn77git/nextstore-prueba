import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Divider, Box } from '@mui/material';
import { ShopLayout } from "../../components/layouts";
import { CategoryCard, LinkButton, TitleUi } from "../../components/ui";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { dbCategories, dbMarcas } from '../../database';
import { IMarcas } from '../../interfaces/marcas';
import { ICategorias } from '../../interfaces/categories';
import { FC } from 'react';

interface Props {
    marca: IMarcas,
    categories: ICategorias[]
}

const Marca: FC<Props> = ({ marca, categories }) => {
  return (
    <ShopLayout title='Next Store Uniforms - Inicio' pageDescription={'Encuentra los mejores uniformes para tu empresa'} >
        <Card elevation={0}>


            <CardMedia  
                sx={{ maxHeight: 400 }}
                component='img'
                alt='Fondo de Marca'
                image={ marca.image.url }
            />


        </Card>

        <Grid container justifyContent='center' className='main-grid'>

            <Grid container item xs={12} className='home-grid'>


                <Grid container>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='center'> 
                            <TitleUi title={marca.name!.toUpperCase()}/>
                        </Box>
                        <Box display='flex' justifyContent='center'> 
                            <Divider sx={{ mt: 2, width: '90%', height: 5, borderRadius: 90 }}/> 
                        </Box>
                    </Grid>    

                    <Grid container spacing={ 1 } sx={{ mt: 5}}>
                    
                        {
                            categories.map( ({name, image}, index) => (
                                <Grid item xs={12} md={6} key={name}>
                                    <CategoryCard href={`/productos/${name}?brands=${marca.name}`} alt={name} image={image} />
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

  export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { name = '' } = query as { name: string };
    const marca = await dbMarcas.getBrandByName( name );
    
    const categories = await dbCategories.getCategoriesByBrand( marca );


    return {
        props: {
            marca,
            categories,
        }
    }
}


export default Marca