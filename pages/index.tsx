import NextLink from "next/link"
import type { GetStaticProps, NextPage } from 'next'

import { MainLayout } from '../components/layouts'
import { SwiperBrands, SwiperHome } from '../components/home';
import { CategoryCard, LinkButton } from '../components/ui';
import { PrincipalNews } from '../components/news';
import { IImages, IMarcas, INoticias } from '../interfaces';
import { dbImages, dbNoticias, dbPublicidades } from '../database';
import { syscomApi } from '../api';

import { Container, Typography, Grid, CardActionArea, CardMedia, Link } from '@mui/material';

interface Props {
  noticia: INoticias;
  imagesMain: IImages[];
  marcas: IMarcas[];
  imagesSecondary: IImages[];
}

const Home: NextPage<Props> = ({ noticia, imagesMain, imagesSecondary, marcas }) => {

  const topAdImages = imagesSecondary.slice(0, 4);
  const bottomAdImages = imagesSecondary.slice(5, 9);


  return (
    <MainLayout title={'Segycom - Inicio'} pageDescription={'Encuentra los mejores productos de seguridad y comunicación'} >

      <Container maxWidth="xl">

        {/* Publicidad slider */}
        <Grid item xs={12} sx={{ mb: 3, pb: 2, pt: 1, px: 1, bgcolor: '#F7F7F7' }} >
          <SwiperHome images={ imagesMain }/>
        </Grid> 


        {/* TODO agregar la ultima noticia desde la base de datos */}
        <PrincipalNews 
            date={noticia.date} 
            img={noticia.img} 
            title={noticia.title} 
            details={noticia.details} 
            link={`./noticias/${ noticia.slug || ''  }`} 
          />


        {/* Publicidad cuatro imagenes Top */}
        <Grid container sx={{ mb: 3, bgcolor: '#F7F7F7' }} >

          <Grid container justifyContent='center' display='flex' spacing={1} sx={{ px: 1, py: 3 }} >
            {
                topAdImages.map( (image, index) => (

                  <Grid item xs={6} md={3} key={index}>
                    <NextLink href={image.link} passHref>
                      <Link>
                        <CardActionArea>
                          <CardMedia component='img' image={ image.url } />   
                        </CardActionArea>
                      </Link>
                    </NextLink>
                  </Grid>

              ))
            }

          </Grid>

        </Grid> 

        {/* Titulo de servicios */}
        <Grid container sx={{mb: 3, py: { xs: 5, md: 8}, textAlign: 'center', bgcolor: '#F7F7F7'}}>
          <Grid item xs={12} sx={{ mb: 1}}>
              <Typography variant='h4' fontWeight={600} color='#404040'>Servicios que ofrecemos</Typography>
          </Grid>
          <Grid item xs={12} >
              <Typography variant='body1' fontWeight={500} color='#404040'>En SEGYCOM ofrecemos distintos tipos de servicios, asi como la venta de todo equipo de comunicación, seguridad y rastreo.</Typography>
          </Grid>
        </Grid>


        {/* Apartado de plataforma */}
        <Grid container direction={ 'row-reverse' } alignItems='center' sx={{ py: { xs: 5, md: 8 }, pl: { xs: 1, md: 5}, pr:{ xs: 1, md: 0}, mb: 3, bgcolor: '#F7F7F7' }} >
            <Grid item xs={12} md={7} sx={{ with: '100%', mb: { xs: 5, md: 0 }}}>
              <CardMedia component='img' image='./assets/home/multiple_devices.webp' />   
            </Grid>
            
            <Grid item xs={12} md={5}>
                <Typography variant='h4' sx={{ mb: 3 }} fontWeight={600} color='#404040'>Plataforma de rastreo</Typography>                  
                <Typography variant='body1' sx={{ mb: 2 }} fontWeight={500} align='justify' color='#404040'>El servicio de ratreo de la platafoma Segycom ,es una de las más nuevas en el mercado ofreciendo servicio personalizado a cada cliente depediendo sus necesidades de monitoreo.</Typography>
                <LinkButton href={'/plataforma'} title={'Más información...'} />
            </Grid>
        </Grid>

        <Grid container sx={{ mb: 3, px: 1, py: 3 ,  bgcolor: '#F7F7F7'}} >
          <Grid container spacing={1} display='flex' justifyContent='center' >
            <Grid item xs={12} md={6}>
                <CategoryCard href={`${process.env.NEXT_PUBLIC_HOST_NAME}productos/550?categoria=iot,_gps_y_telem%C3%A1tica&id_categoria=550&orden=topseller&pagina=1`} alt={'GPS'} image={'./assets/home/gpss.webp'} />
            </Grid>
            <Grid item xs={12} md={6} >
                <CategoryCard href={`${process.env.NEXT_PUBLIC_HOST_NAME}productos/533?categoria=radios_comerciales_icom_/_kenwood&id_categoria=533&orden=topseller&pagina=1`} alt={'RADIO COMUNICACIÓN'} image={'./assets/home/radios.webp'} />
            </Grid>
            <Grid item xs={12} md={6}>
                <CategoryCard href={`${process.env.NEXT_PUBLIC_HOST_NAME}productos/504?categoria=luces_auxiliares&id_categoria=504&orden=topseller&pagina=1`} alt={'LUCES DE EMERGENCIAS'} image={'./assets/home/luz.webp'} />
            </Grid>
            <Grid item xs={12} md={6} >
                <CategoryCard href={`${process.env.NEXT_PUBLIC_HOST_NAME}productos/214?categoria=c%C3%A1maras_ip_y_nvrs&id_categoria=214&orden=topseller&pagina=1`} alt={'VIDEO SEGURIDAD'} image={'./assets/home/video.webp'} />
            </Grid>
          </Grid>
        </Grid>

        {/* Swiper de marcas */}
        {/* <Grid item xs={12} sx={{ mb: 3, py: { xs: 5, md: 8 }, px: 1, bgcolor: '#F7F7F7' }}>
          <SwiperBrands marcas={ marcas } />
        </Grid> */}

        {/* Publicidad cuatro imagenes Bottom */}
        <Grid container justifyContent='space-between' sx={{ mb: 3, bgcolor: '#F7F7F7' }}>

        <Grid container justifyContent='center' display='flex' spacing={1} sx={{ px: 1, py: 3 }} >
            {
                bottomAdImages.map( (image, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <NextLink href={image.link} passHref>
                      <Link>
                        <CardActionArea>
                          <CardMedia component='img' image={ image.url } />   
                        </CardActionArea>
                      </Link>
                    </NextLink>
                  </Grid>
              ))
            }
          </Grid> 
        </Grid> 

      </Container>

      
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
  const marcasName = [ 'ruptela', 'meitrack', 'hikvision', 'federal_signal_industrial', 'kenwood', 'nxradio', 'epcom', 'ubiquiti_networks', 'tplink', 'concox', 'epcom_industrial']
  const marcasList:IMarcas[] = [];

  // Cargar las principales marcas 
  // await Promise.all(marcasName.map(async (marca) => {
  //   try {
  //     const { data } = await syscomApi.get<IMarcas>(`marcas/${marca}`);
  //     marcasList.push(data); // Fusiona los datos de la respuesta con el array existente
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }));

  // Cargar la ultima noticia 
  const noticia = await dbNoticias.getLatestNoticia();
    
  if ( !noticia ) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  const imagesMain = await dbImages.getAllImagesSwiper();
  const imagesSecondary = await dbPublicidades.getAllPublicidades();

  return {
    props: {
      noticia,
      imagesMain,
      imagesSecondary,
      marcas: marcasList,
    },
    revalidate: 60 * 60 * 24
  }
}

export default Home
