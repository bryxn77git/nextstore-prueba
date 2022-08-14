import { Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography, Tooltip } from '@mui/material';
import { LinkButton } from "../ui"
import { IProduct } from '../../interfaces';
import { FC, PropsWithChildren, useState } from 'react';
import { useMediaQuery, useTheme } from "@mui/material";

import NextLink from "next/link";

interface Props {
    product: IProduct;
}

export const ProductCard: FC<PropsWithChildren<Props>> = ({ product }) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const theme = useTheme();

  return ( 
    
        <Card elevation={0}>
        <NextLink href={`/producto/${ product.slug }`} passHref>
            <Link>
                <CardActionArea sx={{ borderRadius: '5px', width: '100%', maxWidth: 240, minHeight: { xs: 200, sm: 255, md: 220, lg: 300} }} className='card-img'>
                    <CardMedia  
                        component='img'
                        alt={ product.title }
                        image={ product.img[0] }
                        className='img-zoom fadeIn'
                        sx={{ maxHeight: {xs: 200, sm: 255, md: 220, lg: 300} }}
                        onLoad={ () => setIsImageLoaded(true) }
                    />
                </CardActionArea>
            </Link>
        </NextLink>
        <CardContent sx={{ textAlign: 'center', display: isImageLoaded ? 'block' : 'none'}} className="fadeIn" >
            <Tooltip title={product.title} arrow>
                <Typography variant='body1' fontSize={{xs: 10, sm: '1rem' }}>
                    {
                         product.title.length < 25 ? product.title.charAt(0).toUpperCase() + product.title.slice(1) : (product.title.charAt(0).toLocaleUpperCase() + product.title.slice(1)).substring(0, 25) + '...' 
  
                    }
                </Typography>
            </Tooltip>
            <LinkButton href='/' title={ product.marca.charAt(0).toLocaleUpperCase() + product.marca.slice(1) } />
        </CardContent>
        </Card>
    // </Grid>
  )
}
