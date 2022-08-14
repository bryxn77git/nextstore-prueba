import { FC } from "react";
import NextLink from "next/link"
import { Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"

interface Props {
    href: string;
    alt: string;
    image: string;
}

export const CategoryCard: FC<Props> = ({ href, alt, image }) => {
  
    return (
    
        <Card sx={{ textAlign: 'center'}}>
            <NextLink href={ href } passHref prefetch={ false }>
            <Link className='card-img'>
                <CardActionArea>
                    <CardMedia
                    component='img'
                    image={ image }
                    alt={ alt }
                    height="270"
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
                        { alt.toUpperCase() }
                    </Typography>
                </CardActionArea>
            </Link>
            </NextLink>
        </Card>
  )
}
