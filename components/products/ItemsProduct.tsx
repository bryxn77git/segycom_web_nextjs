import React from 'react'
import { Grid, Card, CardMedia, CardActions } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { IProducto } from '../../interfaces';
import { FC } from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardItem } from './ProductCardItem';

SwiperCore.use([Pagination, Navigation]);

interface Props {
    products: IProducto[];
  }


export const ItemsProduct: FC<Props> = ({ products }) => {

    const productItemCount = () => {
      
      switch (products.length) {
        case 1:
          return (
            <>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
            </>
          );
        case 2:
          return (
            <>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
            </>
          );
        case 3:
          return (
            <>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
            </>
          );
        case 4:
          return (
            <SwiperSlide></SwiperSlide>
          );
        default:
          return <></>;
      }

    };

  return (
    <Grid 
        container 
        direction="row"
        justifyContent="center"
      >


            <Grid item container xs={12} >

            {/*#TODO Carouserl Component */}

                <Swiper
                   slidesPerView={1}
                   spaceBetween={10}
                  //  loop={true}
                  //  centeredSlides= {true}
                   pagination={{
                     clickable: true,
                     dynamicBullets: true,
                   }}
                   navigation={true}
                   breakpoints={{
                     640: {
                       slidesPerView: 2,
                       spaceBetween: 20,
                     },
                     768: {
                       slidesPerView: 4,
                       spaceBetween: 40,
                     },
                     1024: {
                       slidesPerView: 5,
                       spaceBetween: 50,
                     },
                   }}
                   modules={[Pagination, Navigation]}
                >
                    {
                        products.map( product => (

                            
                            <SwiperSlide
                                key={ product.producto_id }  
                                className='swiperItems'

                            >
                             
                              <ProductCardItem 
                                  product={ product }
                              />

                              

                            </SwiperSlide>
                        ))
                      }
                      <>
                      { productItemCount() }
                      </>
                </Swiper>
            </Grid>
        </Grid>
  )
}
