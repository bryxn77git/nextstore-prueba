import { CardMedia } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import  SwiperCore ,{ Pagination, Navigation, Autoplay } from "swiper";
import { useMediaQuery, useTheme } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IImages } from '../../interfaces';
import { FC } from 'react';

SwiperCore.use([Autoplay, Pagination, Navigation]);

interface Props {
  images: IImages[];
}

export const SwiperHome:FC<Props> = ({ images }) => {

  
  const theme = useTheme();
  const showNavigation = useMediaQuery(theme.breakpoints.up('sm')) ? true : false;

  return (
    <Swiper 
        slidesPerView={1}
        grabCursor={true}
        spaceBetween={10}
        centeredSlides={true}
        pagination={{
            clickable: true,
            dynamicBullets: true,
        }}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false
        }}
        loop={true}
        navigation={ showNavigation }
        
    >
      {
        images.map( image => (
            <SwiperSlide key={ image.name }>
              <CardMedia
                  component='img'
                  alt={ image.name }
                  image={ image.url }
                  sx={{ width: '100%', maxHeight: 600}}
              />  
            </SwiperSlide>            

        ))
      }
        
    </Swiper>
  )
}
