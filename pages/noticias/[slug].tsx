import { MainLayout } from "../../components/layouts"
import { Container, Grid, Typography, Divider, CardMedia } from '@mui/material';
import { FC } from 'react';
import { useRouter } from 'next/router';

import { 
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon, 
} from 'react-share';
import { INoticias } from "../../interfaces";
import { GetStaticPaths, GetStaticProps } from "next";
import { dbNoticias } from "../../database";
import { DatesFormat } from "../../components/news";

interface Props {
    noticia: INoticias;

}

const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

const Noticia: FC<Props> = ({ noticia }) => {

    const route = useRouter().asPath
    
    const { date, title, details, img } = noticia; 

    const dateFormat = new Date( date );

  return (
    <MainLayout title={title} pageDescription={details.length < 100 ? details.charAt(0).toUpperCase() + details.slice(1) : (details.charAt(0).toLocaleUpperCase() + details.slice(1)).substring(0, 100) + '...' } imageFullUrl={img}>
        
        <Container maxWidth='xl' >

        <Grid minHeight='calc(100vh - 100px)' sx={{ mb: 3 }}>

        <Grid container sx={{ mt: { xs: 0, md: 3 }, px: 1, bgcolor: '#F7F7F7', py: 5 }} >
              
            <Grid item xs={12} sx={{ px: { xs: 1, md: 10 }, mb: { xs: 3, md: 0 } }} >
              <DatesFormat date={ date } dayLocation='right' monthLocation="right" yearLocation="right"/>

            </Grid>


            <Grid item xs={12} md={5} justifyContent='center' sx={{ pl: { xs: 1, md: 10}, mb: { xs: 3, md: 0} }}>
                  <CardMedia    
                      component='img'
                      // alt={ products[1].title }
                      image={ img }
                      sx={{ maxWidth: '100% ' }}
                      // className='img-zoom'
                  />   
            </Grid> 

            <Grid item xs={12} md={7} sx={{ pl: { xs: 1, md: 5 }, pr: { xs: 1, md: 10 } }}> 
                <Typography sx={{ mb: 3 }} variant='h4' fontWeight={600} color='#8C0712'>{ title }</Typography>
                {/* <Divider sx={{ width: '100%', mb: { xs: 3, md: 5 } }} /> */}

                {
                    details.split("\n").map((i, key) => (
                    <Typography key={key} sx={{ mb: 2 }} variant='body1' fontWeight={500} textAlign='justify' color='#404040'>
                        {i}    
                    </Typography>
                    ))
                }
                {/* <Typography sx={{ mb: 2 }} variant='body1' fontWeight={500} textAlign='justify' color='#404040'>{ details }</Typography> */}

            <Grid item xs={12} justifyContent='end' display='flex' sx={{ px: 0 }}> 
                <Grid sx={{ pr: 1 }}>
                    <FacebookShareButton
                        url={ origin + route }
                        quote={ title }
                    >
                        <FacebookIcon size={40} round={true} />
                    </FacebookShareButton>
                </Grid>
                <Grid >
                    <WhatsappShareButton
                        url={ origin + route }
                    >
                        <WhatsappIcon size={40} round={true} />
                    </WhatsappShareButton>
                </Grid>
            </Grid>
            </Grid>

            
        </Grid>

        </Grid>


        </Container>
    </MainLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
    const noticiasSlug = await dbNoticias.getAllNoticiaSlugs();
    
    return {
      paths: noticiasSlug.map( ({ slug }) => ({
        params: {
          slug
        }
      })),
      fallback: 'blocking'
    }
    
  }

export const getStaticProps: GetStaticProps = async ({ params }) => { 
    
    const { slug = '' } = params as { slug: string };
    const noticia = await dbNoticias.getNoticiaBySlug( slug );
    
    if ( !noticia ) {
      return {
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }
  
    return {
      props: {
        noticia
      },
      revalidate: 60 * 60 * 24
    }
  }

export default Noticia;