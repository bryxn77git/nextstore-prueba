import { Avatar, Box, Button, ButtonGroup, Card, CardActionArea, CardMedia, Chip, Divider, Grid, IconButton, Link, Tooltip, Typography, CardContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useContext, useState } from "react";
import NextLink from "next/link"
import { ShopLayout } from "../../components/layouts"
import { dbMarcas, dbProducts } from '../../database';
import { useMediaQuery, useTheme } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';


import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import  SwiperCore ,{ Pagination, Navigation, Autoplay } from "swiper";
import { ProductCard } from "../../components/products";
import { ICartProduct, IMarcas, IProduct } from "../../interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ItemCounter } from "../../components/ui";
import { useRouter } from "next/router";
import { CartContext, UiContext } from "../../context";
import { ProductAddedToCart } from '../../components/products/ProductAddedToCart';
import { LinkButton } from '../../components/ui/LinkButton';

SwiperCore.use([Autoplay, Pagination, Navigation]);



interface ColorProp {
    nombre: string, 
    color: string 
}

interface Props {
    product: IProduct,
    brand: IMarcas,
    relatedProducts: IProduct[]
}


const Producto: NextPage<Props> = ({ product, brand, relatedProducts }) => {

    const router = useRouter();
    const { addProductToCart } = useContext( CartContext )
    const { toggleDialogProductAdded  } = useContext( UiContext )

    const theme = useTheme();
    const subTitleSize = useMediaQuery(theme.breakpoints.up('md')) ? 'h6' : 'subtitle2';
    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        title: product.title,
        img: product.img[0],
        color: undefined,
        talla: undefined,
        slug: product.slug,
        quantity: 1,
        code: product.codigo
    })

    const [imgSelected, setImgSelected] = useState(product.img[0]);
    // const [color, setColor] = useState<ColorProp>(product.colores[0]);
    const [talla, setTalla] = useState<string>('Seleccione una talla');
    const [counter, setCounter] = useState(1)
    const [colorSelected, setColorSelected] = useState( product.colores.map( (color, index) => false ))
    const [tallaSelected, setTallaSelected] = useState( product.tallas.map( (color, index) => false ))

    const changeStateColor = ( position: number, colorAdded: ColorProp, checked: boolean ) => { 

        if(!checked){
            setTempCartProduct( currentProduct => ({
                ...currentProduct,
                color: colorAdded
            }));
            
           let newArray = product.colores.map( () => false);
       
           newArray[position] = !colorSelected[position];
       
           setColorSelected( [...newArray] );
        }

    }
    // const changeStateTalla = ( position: number, tallaAdded: string, checked: boolean ) => { 
    const changeStateTalla = ( e: SelectChangeEvent<typeof talla> ) => { 


        if(e.target.value){

            if( e.target.value !== 'Seleccione una talla' ){

                setTempCartProduct( currentProduct => ({
                    ...currentProduct,
                    talla: e.target.value
                }));
            //    let newArray = product.tallas.map( () => false);
    
               setTalla(e.target.value)
            }else {
                setTempCartProduct( currentProduct => ({
                    ...currentProduct,
                    talla: undefined
                }));
            //    let newArray = product.tallas.map( () => false);
    
               setTalla(e.target.value)
            }

       
        //    newArray[position] = !tallaSelected[position];
       
        //    setTallaSelected( [...newArray] );
        }

    }

    const onUpdateQuantity = ( quantity: number ) => {
        setTempCartProduct( currentProduct => ({
          ...currentProduct,
          quantity
        }));
    }

    const onAddProduct = () => {
        if ( !tempCartProduct.talla || !tempCartProduct.color ) { return; }
    
        addProductToCart(tempCartProduct);
        toggleDialogProductAdded();
        //router.push('/carrito');
    }

  return (
    <ShopLayout title={ product.title.charAt(0).toLocaleUpperCase() + product.title.slice(1) } pageDescription={product.title.charAt(0).toLocaleUpperCase() + product.title.slice(1)} >

        <Grid container justifyContent='center' className='main-grid'>

        

            <Grid
            container
            sx={{ pt: {xs: 1, md: 5} }} 
            display='flex' 
            justifyContent='center'
            className="home-grid"
            >

                <Grid container item xs={12} sx={{ display: {xs: 'flex', md: 'none'}}} justifyContent='center'>
                    <Swiper 
                        slidesPerView={1}
                        // grabCursor={true}
                        // spaceBetween={10}
                        centeredSlides={true}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}                        
                    >
                        {
                            product.img.map( ( img, index ) => (
                                <SwiperSlide key={index}>
                                    <Card elevation={0} sx={{ display: 'flex', justifyContent: 'center' }} >
                                    
                                        <CardMedia  
                                            component='img'
                                            alt={ product.title }
                                            image={ img }
                                            sx={{ width: '100%', maxWidth: 280 }}
                                        />
                
                                    </Card>
                                </SwiperSlide>   
                            ))
                        }              
   
                    </Swiper>
                </Grid>
                

                <Grid item xs={4} display='flex' sx={{ display: {xs: 'none', md: 'flex'}}}>

                <Grid 
                        container 
                        item 
                        xs={2}
                        direction='column'
                        alignItems='center'
                        sx={{ display: {xs: 'none', md: 'flex'}}}
                    >  
                    {
                        product.img.map( (img, index) => (
                            <Grid
                                key={ index }
                                item
                                xs={2}
                                
                            >
                               
                                <Card elevation={0} 
                                >
                                    <CardActionArea sx={{width: 50,
                                    height: 65,
                                    }}>
                                        <CardMedia  
                                            component='img'
                                            alt={ product.title }
                                            image={ img }
                                            onMouseEnter={ () => setImgSelected(img)}
                                        />

                                    </CardActionArea>
            
                                </Card>
                                

                            </Grid>
                        ))
                    }                       
                        
                    </Grid>
                    
                    <Grid container item xs={10} >
                        <Card elevation={0} sx={{ display: 'flex', alignItems: 'center'}}>
                        
                            <CardMedia  
                                component='img'
                                alt={ product.title }
                                image={ imgSelected }
                                sx={{ maxHeight: 500, width: '100%' }}
                            />

                        </Card>
                        {/* <ReactImageMagnify {...{
                                smallImage: {
                                    alt: `${product.title}`,
                                    isFluidWidth: true,
                                    src: imgSelected,  
                                },
                                largeImage: {
                                    src: imgSelected,
                                    width: 750,
                                    height: 850
                                },
                                    
                            }} /> */}
                    </Grid>

                    

                </Grid>

                <Grid item xs={12} md={6} sx={{ ml: { xs: 0 , md: 5}, mb: 5 }}>

                    <Grid item xs={12}>
                        <Typography variant={subTitleSize} fontWeight={800} color='text.primary'>
                            { product.title.charAt(0).toLocaleUpperCase() + product.title.slice(1) }
                            </Typography>
                        <Divider sx={{ mt: 1, mb: 1, height: 5, borderRadius: 90 }}/> 
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant='subtitle1' fontWeight={600} color='text.secondary'>{ product.marca.charAt(0).toLocaleUpperCase() + product.marca.slice(1) }</Typography>
                        </Grid>
                        <Grid item xs={6} justifyContent='end' display='flex'>
                            <NextLink href={ `/marca/${product.marca.toLocaleLowerCase()}` } passHref> 
                                <Link>
                                    <Card elevation={0} >
                                    
                                        <CardMedia  
                                            component='img'
                                            alt={brand.name}
                                            image={brand.logo.url}
                                            sx={{ width: 120, maxHeight: 75}}
                                        />
                                    </Card>
                                
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                    
                    
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <Typography variant='subtitle1' fontWeight={600} color='text.secondary'>Colores: { tempCartProduct.color?.nombre }</Typography>
                        {
                            product.colores.map( (color, index) => (
                                <Tooltip title={color.nombre} arrow key={index}>
                                    <IconButton onClick={ () => { changeStateColor(index, color, colorSelected[index]) } } >
                                    <Avatar sx={{ bgcolor: color.color, width: 25, height: 25, border: `2px solid ${ colorSelected[index] ? '#C2BB4F' : '#666666'}` }}>
                                        { colorSelected[index] ? (
                                            <CheckIcon />
                                            ) : ''
                                        }
                                    </Avatar>
                                    </IconButton>

                                </Tooltip>
                            ))
                        }
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <Typography variant='subtitle1' fontWeight={600} color='text.secondary'>Tallas:</Typography>
                        <FormControl sx={{ width: '50%'}}>
                            <Select
                                
                                value={talla}
                                onChange={changeStateTalla}
                                // input={<OutlinedInput  />}
                                renderValue={(selected) => {
                                    if( selected !== 'Seleccione una talla') {
                                        return (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                <Chip label={selected} color='primary' sx={{ color: '#ffffff'}}/>
                                            </Box>
                                        )
                                    } else {
                                        return (
                                            <Typography variant='body1' color='text.secondary'>Seleccione una talla</Typography>
                                        )
                                    }

                                }}
                                // onChange={ handleSizeUpdate }
                            >
                                <MenuItem
                                        value={'Seleccione una talla'}
                                    >
                                        Seleccione una talla
                                </MenuItem>
                            {
                                product.tallas.map((type, index) => (
                                    <MenuItem
                                        key={index}
                                        value={type}
                                    >
                                        {type}
                                    </MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                        {/* <ButtonGroup variant="outlined">
                            {
                                product.tallas.map( ( talla, index) => (
                                    <Button 
                                        key={index}
                                        variant={tallaSelected[index] ? 'contained' : 'outlined'}
                                        onClick={ () => changeStateTalla( index, talla, tallaSelected[index] ) }
                                    >
                                        { talla }
                                    </Button>

                                )) 
                            }
                            
                        </ButtonGroup> */}
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <Typography variant='subtitle1' fontWeight={600} color='text.secondary'>Categorias:</Typography>
                        {
                            product.categorias.map( categoria => (
                                <NextLink href={`/categoria/${ categoria }`} passHref key={categoria}>
                                    <Link>
                                        <Chip color="secondary" label={ categoria } sx={{ mr: 0.5 }} className='chip-category'/>
                                    </Link>
                                </NextLink>
                            ))
                        }
                        
                    </Grid>
                   
                    <Grid item xs={12} sx={{ mt: 5 }}>
                        <Box display='flex' alignItems='center'>
                            <ItemCounter 
                                currentValue={ tempCartProduct.quantity }
                                updateQuantity={ onUpdateQuantity }
                            />

                            {
                                (tempCartProduct.talla && tempCartProduct.color) ? (
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        startIcon={<AddIcon />}
                                        onClick={ onAddProduct }
                                        disabled={false}
                                    >
                                        Agregar a la cotización
                                        
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        disabled={ true}
                                    >
                                        Seleccione una talla y color
                                        
                                    </Button>
                                )
                            }

                            
                        </Box>
                        
                    </Grid>

                </Grid>

                <Divider sx={{ mt: 5, mb: 5, width: '100%'}}/> 

                <Grid container sx={{ mb: 3 }}>
                    <Typography variant={subTitleSize} fontWeight={600} color='text.secondary'>Descripción:</Typography>
                </Grid>
                <Grid container sx={{ mx: {xs: 0, md: 5}}} direction='column'>
                    
                        {
                           product.descripcion.split("\n").map((i, key) => (
                            <Typography key={key} color='text.secondary' variant='body1'>
                                {i}    
                            </Typography>
                           ))
                        }

                        {
                            product.guiaTallas?.length !== undefined && (
                                <CardMedia  
                                    component='img'
                                    alt={ product.title }
                                    image={ product.guiaTallas }
                                    sx={{ width: '100%', maxWidth: 280, }}
                                />
                            ) 
                        }
                        
                    
                </Grid>
                


                {
                    relatedProducts.length > 0 && (
                        
                        <>
                        <Divider sx={{ mt: 5, mb: 5, width: '100%'}}/> 

                        <Grid item xs={12} sx={{ mb: 5 }} >
                            <Box display='flex' justifyContent='center'>
                                <Typography variant={subTitleSize} fontWeight={800} color='text.primary'>Productos relacionados</Typography>

                            </Box>
                            <Box display='flex' justifyContent='center'>
                                <Divider sx={{ mt: 1, mb: 1, height: 5, borderRadius: 90, width: { xs: 153, md: 215 } }}/> 

                            </Box>
                        </Grid>

                        <Grid container spacing={1} display='flex' justifyContent='center'>
                            {
                                relatedProducts.map( (product, index) => ( 
                                    <Grid key={index} item xs={6} md={3} justifyContent='center' display='flex'>
                                        <Card elevation={0}>
                                            <NextLink href={`/producto/${ product.slug }`} passHref>
                                                <Link>
                                                    <CardActionArea sx={{ borderRadius: '5px', minHeight: { xs: 200, sm: 255, md: 280} } } className='card-img'>
                                                        <CardMedia  
                                                            component='img'
                                                            alt={ product.title }
                                                            image={ product.img[0] }
                                                            sx={{ width: {xs: 168, sm: 200, md: 220}, maxHeight: 340}}
                                                            className='img-zoom fadeIn'
                                                            
                                                        />
                                                    </CardActionArea>
                                                </Link>
                                            </NextLink>
                                            <CardContent sx={{ textAlign: 'center'}} className="fadeIn" >
                                                <Tooltip title={product.title} placement="top" arrow>
                                                    <Typography variant='body1' fontSize={{xs: 10, sm: '1rem' }}>
                                                        {
                                                            product.title.length < 25 ? product.title.charAt(0).toLocaleUpperCase() + product.title.slice(1) : (product.title.charAt(0).toLocaleUpperCase() + product.title.slice(1)).substring(0, 25) + '...' 
                                                        }
                                                    </Typography>

                                                </Tooltip>
                                                <LinkButton href='/' title={ product.marca.charAt(0).toLocaleUpperCase() + product.marca.slice(1) }  />
                                            </CardContent>
                                            </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                        </>
                    )
                }
                

                <ProductAddedToCart product={tempCartProduct} />

            
            </Grid>

        </Grid>
    
    </ShopLayout>
  )
}

// getStaticPaths....
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
    const productSlugs = await dbProducts.getAllProductSlugs();
  
    
    return {
      paths: productSlugs.map( ({ slug }) => ({
        params: {
          slug
        }
      })),
      fallback: 'blocking'
    }
  }
  
  // You should use getStaticProps when:
  //- The data required to render the page is available at build time ahead of a user’s request.
  //- The data comes from a headless CMS.
  //- The data can be publicly cached (not user-specific).
  //- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
  export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug( slug );
    
    let brand = await dbMarcas.getBrandByName(product?.marca!);

    console.log(brand)
    const relatedProducts = await dbProducts.getRelatedProducts( product?.categorias!, product?._id! );
    
    if( !brand ){
        brand = {}
    }

    
    if ( !product ) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  
    return {
      props: {
        product,
        brand,
        relatedProducts
      },
      revalidate: 60 * 60 * 24
    }
  }

export default Producto