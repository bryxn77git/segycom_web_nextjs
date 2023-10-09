import { CardMedia } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import  SwiperCore ,{ Pagination, Navigation, Autoplay } from 'swiper';
import { useMediaQuery, useTheme } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FC } from 'react';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export const SwiperScreens:FC = () => {

  
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

        <SwiperSlide>
            <CardMedia  
                component='img'
                image={ './assets/plataforma/pantalla-plataforma2.png' }
            />   
        </SwiperSlide>
        <SwiperSlide>
            <CardMedia  
                component='img'
                image={ './assets/plataforma/pantalla-plataforma3.png' }
            />  
            {/* <img src="./assets/plataforma/pantalla-plataforma3.png" alt="Pantalla Plataforma3"/> */}
        </SwiperSlide>
        <SwiperSlide>
            <CardMedia  
                component='img'
                image={ './assets/plataforma/pantalla-plataforma4.png' }
            />  
            {/* <img src="./assets/plataforma/pantalla-plataforma4.png" alt="Pantalla Plataforma4"/> */}
        </SwiperSlide>
        <SwiperSlide>
            <CardMedia  
                component='img'
                image={ './assets/plataforma/pantalla-plataforma5.png' }
            />  
            {/* <img src="./assets/plataforma/pantalla-plataforma5.png" alt="Pantalla Plataforma5"/> */}
        </SwiperSlide>
    </Swiper>
  )
}
