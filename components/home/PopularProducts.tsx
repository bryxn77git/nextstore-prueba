import { Divider, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Box, Link, Button, Tooltip } from '@mui/material';
import { useMediaQuery, useTheme } from "@mui/material";
import { LinkButton, TitleUi } from '../ui';
import NextLink from "next/link"
import { IProduct } from '../../interfaces/products';
import { FC } from 'react';

interface Props {
    products: IProduct[];
}

export const PopularProducts:FC<Props> = ({ products }) => {

    const theme = useTheme();
    const winsowsSize = useMediaQuery(theme.breakpoints.up('sm')) ? 3 : 1;

  return (
    <>
        <Grid item xs={12} md={7}  >
            
            
            <TitleUi title='PRODUCTOS POPULARES'/>  
            
            <LinkButton href='/categorias' title='Ver más...' />

            <Divider sx={{ mt: 1, width: { xs: 245, sm: 415 }, height: 5 }}/> 

            <Grid 
            container 
            direction='row' 
            spacing={ winsowsSize } 
            sx={{ marginTop: 2}} 
            display='flex' 
            justifyContent='center' 
            >
            <Grid item>
                <Card elevation={0}>
                    <NextLink href={ `/producto/${products[1].slug }`} passHref>
                        <Link>
                            <CardActionArea sx={{ borderRadius: '5px', minHeight: { xs: 147, sm: 255, md: 280} }} className='card-img'>
                                <CardMedia  
                                    component='img'
                                    alt={ products[1].title }
                                    image={ products[1].img[0] }
                                    sx={{ width: {xs: 115, sm: 200, md: 220}, maxHeight: 340}}
                                    className='img-zoom'
                                />
                            </CardActionArea>
                        </Link>
                    </NextLink>
                    <CardContent sx={{ textAlign: 'center'}}>
                    <Tooltip title={products[1].title} placement="top" arrow>
                        <Typography variant='body1' fontSize={{xs: 10, sm: '1rem' }}>
                            { 
                                useMediaQuery(theme.breakpoints.up('md')) 
                                ? products[1].title.length < 25 ? products[1].title : products[1].title.substring(0, 25) + '...' 
                                : products[1].title.length < 15 ? products[1].title : products[1].title.substring(0, 15) + '...'  
                            }
                        </Typography>
                    </Tooltip>
                        <LinkButton 
                            href={ `/marca/${products[1].marca.toLocaleLowerCase()}`} 
                            title={ products[1].marca.charAt(0).toUpperCase() + products[1].marca.slice(1) }
                        />
                    </CardContent>
                </Card>
                    
            </Grid>
            <Grid item>
                <Card elevation={0}>
                    <NextLink href={ `/producto/${products[2].slug }`} passHref>
                        <Link>
                            <CardActionArea sx={{ borderRadius: '5px', minHeight: { xs: 147, sm: 255, md: 280}}} className='card-img'>
                                <CardMedia  
                                    component='img'
                                    alt={ products[2].title }
                                    image={ products[2].img[0] }
                                    sx={{ width: {xs: 115, sm: 200, md: 220}, maxHeight: 340}}
                                    className='img-zoom'
                                />
                            </CardActionArea>
                        </Link>
                    </NextLink>
                    <CardContent sx={{ textAlign: 'center'}}>
                    <Tooltip title={products[2].title} placement="top" arrow>
                        <Typography variant='body1' fontSize={{xs: 10, sm: '1rem' }}>
                            { 
                                useMediaQuery(theme.breakpoints.up('md')) 
                                ? products[2].title.length < 25 ? products[2].title : products[2].title.substring(0, 25) + '...' 
                                : products[2].title.length < 15 ? products[2].title : products[2].title.substring(0, 15) + '...'  
                            }
                        </Typography>
                    </Tooltip>                    
                    <LinkButton 
                           href={ `/marca/${products[2].marca.toLocaleLowerCase()}`} 
                            title={ products[2].marca.charAt(0).toUpperCase() + products[2].marca.slice(1) }
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card elevation={0}>
                    <NextLink href={ `/producto/${products[3].slug }`} passHref>
                        <Link>
                            <CardActionArea sx={{ borderRadius: '5px', minHeight: { xs: 147, sm: 255, md: 280}}} className='card-img'>
                                <CardMedia  
                                    component='img'
                                    alt={ products[3].title }
                                    image={ products[3].img[0] }
                                    sx={{ width: {xs: 115, sm: 200, md: 220}, maxHeight: 340}}
                                    className='img-zoom'
                                />
                            </CardActionArea>
                        </Link>
                    </NextLink>
                    <CardContent sx={{ textAlign: 'center'}}>
                        <Tooltip title={products[3].title} placement="top" arrow>
                            <Typography variant='body1' fontSize={{xs: 10, sm: '1rem' }}>
                                { 
                                    useMediaQuery(theme.breakpoints.up('md')) 
                                    ? products[3].title.length < 25 ? products[3].title : products[3].title.substring(0, 25) + '...' 
                                    : products[3].title.length < 15 ? products[3].title : products[3].title.substring(0, 15) + '...'  
                                }
                            </Typography>
                        </Tooltip>
                        <LinkButton 
                            href={ `/marca/${products[3].marca.toLocaleLowerCase()}`} 
                            title={ products[3].marca.charAt(0).toUpperCase() + products[3].marca.slice(1) }
                        />
                    </CardContent>
                </Card>
            </Grid>
            </Grid>
        </Grid>
        <Grid container item xs={12} md={5}>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            sx={{backgroundColor: '#F2F0B9', borderRadius: '600px 0px 0px 0px', width: '100%', padding: 2 }}
        >
            <Card elevation={2} sx={{ width: 320, maxHeight: 475 }} >
            <NextLink href={ `/producto/${products[0].slug }`} passHref>
                <Link>
                    <CardActionArea className='card-img' sx={{ minHeight: { md: 400} }} >
                        <CardMedia  
                            component='img'
                            alt={products[0].title}
                            image={products[0].img[0]}
                            sx={{ width: '100%', maxHeight: 400, padding: 1 }}
                            className='img-zoom'
                        />
                    </CardActionArea>
                </Link>
            </NextLink>
            <CardContent sx={{ textAlign: 'center'}}>
                <Tooltip title={products[0].title} placement="top" arrow>
                    <Typography variant='body1' fontSize={{xs: 10, sm: '1rem' }}>{ products[0].title.length < 30 ? products[0].title : products[0].title.substring(0, 30) + '...' }</Typography>
                </Tooltip>
                <LinkButton 
                    href={ `/marca/${products[0].marca.toLocaleLowerCase()}`} 
                    title={ products[0].marca.charAt(0).toUpperCase() + products[0].marca.slice(1) } />
            </CardContent>
            </Card>
        </Box>
        </Grid>

    </>
  )
}
