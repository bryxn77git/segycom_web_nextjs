
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardMedia } from '@mui/material';

import SwiperCore, { Pagination, Navigation, Autoplay, EffectFade  } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/effect-fade';

export const SwiperScreens = () => {
  return (

    <Swiper
        slidesPerView={1}
        // spaceBetween={10}
        // centeredSlides={true}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        effect={'fade'}
        pagination={{
            clickable: true,
            dynamicBullets: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false
        }}
        //Loop={true}
    >

        <SwiperSlide className="imgSwiper">
            <img src={`./assets/app/app-screen01.webp`} alt="App Screen" className='imgScreen2' />
            {/* <CardMedia component='img' alt='App Screen' image={ `./assets/app/app-screen01.webp` } className='imgScreen2'/> */}
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <img src={`./assets/app/app-screen02.webp`} alt="App Screen" className='imgScreen2' />
            {/* <CardMedia component='img' alt='App Screen' image={ `./assets/app/app-screen02.webp` } className='imgScreen2'/> */}
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <img src={`./assets/app/app-screen03.webp`} alt="App Screen" className='imgScreen2' />
            {/* <CardMedia component='img' alt='App Screen' image={ `./assets/app/app-screen03.webp` } className='imgScreen2'/> */}
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <img src={`./assets/app/app-screen04.webp`} alt="App Screen" className='imgScreen2' />
            {/* <CardMedia component='img' alt='App Screen' image={ `./assets/app/app-screen04.webp` } className='imgScreen2'/> */}
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <img src={`./assets/app/app-screen05.webp`} alt="App Screen" className='imgScreen2' />
            {/* <CardMedia component='img' alt='App Screen' image={ `./assets/app/app-screen05.webp` } className='imgScreen2'/> */}
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <img src={`./assets/app/app-screen06.webp`} alt="App Screen" className='imgScreen2' />
            {/* <CardMedia component='img' alt='App Screen' image={ `./assets/app/app-screen06.webp` } className='imgScreen2'/> */}
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <img src={`./assets/app/app-screen07.webp`} alt="App Screen" className='imgScreen2' />
            {/* <CardMedia component='img' alt='App Screen' image={ `./assets/app/app-screen07.webp` } className='imgScreen2'/> */}
        </SwiperSlide>
        <SwiperSlide className="imgSwiper">
            <img src={`./assets/app/app-screen08.webp`} alt="App Screen" className='imgScreen2' />
            {/* <CardMedia component='img' alt='App Screen' image={ `./assets/app/app-screen08.webp` } className='imgScreen2'/> */}
        </SwiperSlide>
    </Swiper>   


  )
}
