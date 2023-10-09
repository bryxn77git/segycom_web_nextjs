
// Styles Material ui
import { Card, CardActions, CardMedia, Grid, IconButton, Typography } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

import 'swiper/swiper-bundle.css';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import { clientList } from '../../helpers/plataforma/clientsList';
import { IClientes } from '../../interfaces/clientes';
import { FC } from 'react';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

interface Props {
  clients: IClientes[];
}

export const SwiperClients: FC<Props> = ({ clients }) => {



  return (
      <Grid 
        container 
        direction="row"
        justifyContent="center"
      >


            <Grid item container xs={12} >

            {/*#TODO Carouserl Component */}

                <Swiper
                    // slidesPerView={1}
                    // spaceBetween={15}
                    // centeredSlides={true}
                    breakpoints={{
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 30,
                        },
                
                    }}
                    
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    // loop={true}
                >
                    {
                        clients.map( cliente => (
                            <SwiperSlide
                                key={ cliente._id } 
                                
                            >
                                <Card 
                                  
                                  elevation={0}
                                >
                                    <CardMedia
                                      height={160}
                                      
                                      component="img"
                                      sx={{ mb: 3, maxHeight: 160}}
                                      src={ cliente.background }
                                      alt={ cliente.title }
                                    />
                                    {/* <CardContent> */}
                                      <img alt={ cliente.title } src={ cliente.logo } />
                                    {/* <CardMedia
                                      height={100}
                                      component="img"
                                      // sx={classes.imgcontent}
                                      src={ cliente.logo }
                                      alt={ cliente.title }
                                    /> */}
                                      
                                    {/* </CardContent> */}
                                  
                                  <CardActions >
                                     <Grid item xs={12} justifyContent='center'>
                                      {/* TODO Agregar los links a las redes sociales */}
                                      {
                                          cliente.url !== '' && ( <a href={ cliente.url } target="_blank" rel="noreferrer"><IconButton  ><LanguageIcon /></IconButton></a> )
                                      }
                                      {
                                          cliente.instagram !== '' && (  <a href={ cliente.instagram } target="_blank" rel="noreferrer"><IconButton ><InstagramIcon /></IconButton></a> )
                                      }
                                      {
                                          cliente.facebook !== '' && (  <a href={ cliente.facebook } target="_blank" rel="noreferrer"><IconButton ><FacebookIcon /></IconButton></a> )
                                      }
                                      {
                                          cliente.twitter !== '' && (  <a href={ cliente.twitter } target="_blank" rel="noreferrer"><IconButton ><TwitterIcon /></IconButton></a> )
                                      }
                                      {
                                          cliente.youtube !== '' && (  <a href={ cliente.youtube } target="_blank" rel="noreferrer"><IconButton ><YouTubeIcon /></IconButton></a> )
                                      }
                                      
                                      
                                     
                                      
                                      
                                      
                                  </Grid>
                                  </CardActions>
                                </Card>

                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Grid>
        </Grid>
 
  )
}


