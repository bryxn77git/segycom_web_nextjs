import { FC } from 'react';
import NextLink from "next/link"
import { CardMedia, Link, Grid } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { useMediaQuery, useTheme } from "@mui/material";
import { IMarcas } from '../../interfaces';

SwiperCore.use([Autoplay, Pagination, Navigation]);

interface Props {
  marcas: IMarcas[];
}

export const SwiperBrands:FC<Props> = ({ marcas }) => {

  const theme = useTheme();
  const showNavigation = useMediaQuery(theme.breakpoints.up('sm')) ? true : false;

  marcas.map( marca => {
    const nombrePng = marca.logo.split('/')
    const nombre = nombrePng[nombrePng.length -1 ].split('.')[0]
  })


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
        marcas.map( ({ logo, titulo }) => {

          const nombrePng = logo.split('/')
          const nombre = nombrePng[nombrePng.length -1 ].split('.')[0]

          return (
            <SwiperSlide key={ logo }>
                <NextLink href={`/marcas/${nombre}`} passHref>
                  <Link>
                      <CardMedia
                          component='img'
                          alt={ titulo }
                          image={ logo }
                          sx={{ width: 120, maxHeight: 75}}
                          className='img-zoom'
                      />  
                  </Link>
                </NextLink>
            </SwiperSlide>
          )

        })

      }

    </Swiper>
  )
}
