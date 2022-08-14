import type { NextPage, GetServerSideProps } from 'next';
import { Typography,Box, Grid, Divider, Paper } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { TitleUi } from '../../components/ui';

import { useMediaQuery, useTheme } from "@mui/material";


interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}


const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

    const theme = useTheme();
    const subTitleSize = useMediaQuery(theme.breakpoints.up('sm')) ? 'h6' : 'subtitle2';

  return (
    <ShopLayout title='Next Store Uniforms - Buscar' pageDescription={'Encuentra los mejores uniformes para tu empresa'} >        
    
    <Grid container justifyContent='center' className='main-grid'>

        <Grid
            container
            sx={{ pt: {xs: 1, md: 5} }} 
            display='flex' 
            justifyContent='center'
            className="home-grid"
        >

       
    
    {/* <Typography variant='h1' component='h1' fontSize={30} fontWeight={600}>Buscar productos</Typography> */}
    <Grid sx={{ textAlign: 'center'}} item xs={12}>

    
    
        {/* <TitleUi title='Buscar producto'/>   */}

                    
        {
            foundProducts 
                ? (
                        <Typography variant={subTitleSize} color='text.secondary' fontWeight='600' textTransform="capitalize">Resultados: {query}</Typography>
                    )
                : (
                    <>
                    <Typography variant={subTitleSize} color='text.secondary' fontWeight='600' sx={{ mt: 1}} >No encontramos ningún producto:</Typography>
                    <Typography variant={subTitleSize} color='text.secondary' fontWeight={400} sx={{ ml: 1 }} textTransform="capitalize">{ query }</Typography>
                    </>
  
                )
        }
        </Grid>

        

        <Grid item xs={9} sx={{ mt: 2 }}>
            <ProductList products={ products } />

        </Grid>
        </Grid>
    </Grid>
    </ShopLayout>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // y no hay productos
    let products = await dbProducts.getProductsByTerm( query );
    const foundProducts = products.length > 0;

    // TODO: retornar otros productos
    if ( !foundProducts ) {
        // products = await dbProducts.getAllProducts(); 
        products = await dbProducts.getProductsByTerm('shirt');
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}


export default SearchPage