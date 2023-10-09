import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

import { CardMedia } from '@mui/material';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Autoplay, Pagination, Navigation]);


export const SwiperImageUs = () => {
  return (

    <Swiper
        autoplay={{
            delay: 2000,
            disableOnInteraction: false
        }}
        // loop={true}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
    
        }}
    >
        
        <SwiperSlide className="imgSwiper">
            <CardMedia component='img' alt='Macario' image={ './assets/aboutUs/team/Macario.webp' } className='imgTeamSegycom' />  
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <CardMedia component='img' alt='Carmen' image={ './assets/aboutUs/team/Carmen.webp' } className='imgTeamSegycom' /> 
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <CardMedia component='img' alt='Ernesto' image={ './assets/aboutUs/team/Ernesto.webp' } className='imgTeamSegycom' /> 
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <CardMedia component='img' alt='Lupita' image={ './assets/aboutUs/team/Lupita.webp' } className='imgTeamSegycom' /> 
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <CardMedia component='img' alt='Bryan' image={ './assets/aboutUs/team/Bryan.webp' } className='imgTeamSegycom' /> 
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <CardMedia component='img' alt='Bertha' image={ './assets/aboutUs/team/Bertha.webp' } className='imgTeamSegycom' /> 
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <CardMedia component='img' alt='Veronica' image={ './assets/aboutUs/team/Veronica.webp' } className='imgTeamSegycom' /> 
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <CardMedia component='img' alt='Tomas' image={ './assets/aboutUs/team/Tomas.webp' } className='imgTeamSegycom' /> 
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <CardMedia component='img' alt='Miguel' image={ './assets/aboutUs/team/Miguel.webp' } className='imgTeamSegycom' /> 
        </SwiperSlide> 
    </Swiper>
    
  )
}
