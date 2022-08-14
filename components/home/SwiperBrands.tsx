import { CardMedia, Link } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { useMediaQuery, useTheme } from "@mui/material";
import NextLink from "next/link"
import { IMarcas } from '../../interfaces/marcas';
import { FC } from 'react';

SwiperCore.use([Autoplay, Pagination, Navigation]);

interface Props {
  marcas: IMarcas[];
}

export const SwiperBrands:FC<Props> = ({ marcas }) => {

  const theme = useTheme();
  const showNavigation = useMediaQuery(theme.breakpoints.up('sm')) ? true : false;

  return (
    <Swiper 
      navigation={ showNavigation }
      slidesPerView={1}
      spaceBetween={10}
      // centeredSlides={true}
      autoplay={{
          delay: 2500,
          disableOnInteraction: false
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        // modifierClass: 'bullet-color'
    }}
      // grabCursor={true}
      breakpoints={{
        200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 8,
          spaceBetween: 50,
        },

      }}
    >
            
            {
              marcas.map( ({ logo, name, _id }) => (
                <SwiperSlide key={ _id } >
                  <NextLink href={`/marca/${name}`} passHref>
                    <Link>
                        <CardMedia
                            component='img'
                            alt={ name }
                            image={ logo.url }
                            sx={{ width: 120, maxHeight: 75}}
                            className='img-zoom'
                        />  
                    </Link>
                  </NextLink>
                </SwiperSlide>
              ))
            }
          </Swiper>
  )
}
