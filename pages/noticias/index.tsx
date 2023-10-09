import { MainLayout } from "../../components/layouts"
import { Container, Grid, Typography, Divider } from '@mui/material';
import { PrincipalNews } from '../../components/news/PrincipalNews';
import { SecondaryNews } from "../../components/news";
import { GetStaticProps } from 'next';
import { dbNoticias } from "../../database";
import { INoticias } from '../../interfaces/noticias';
import { FC } from 'react';

import { useMediaQuery, useTheme } from "@mui/material";

interface Props {
  lastNews: INoticias;
  restNews: INoticias[];
}

const Noticias: FC<Props> = ( { restNews, lastNews } ) => {

  const theme = useTheme();
  const title = useMediaQuery(theme.breakpoints.up('sm')) ? 'h3' : 'h4';

  return (
    <MainLayout title={'Noticias'} pageDescription={"Noticias de la empresa Segycom de Chihuahua"}>
        
        <Container maxWidth='xl' >

        <Grid sx={{ bgcolor: '#F7F7F7', pt: { xs: 3, md: 5},   px: { xs: 1, md: 10 } }} >
          <Typography variant={title} fontWeight={600} color='#606060'>Últimas noticias</Typography>
          {/* <Divider sx={{ width: '100%', mt: 1  }} /> */}
        </Grid>
            
            <PrincipalNews 
              date={ lastNews.date || '' }
              img={ lastNews.img || '' } 
              title={ lastNews.title || '' } 
              details={ lastNews.details || '' } 
              link={`./noticias/${ lastNews.slug || ''  }`} 
            />        


          <Grid container item xs={12} sx={{ mb: 3, py: { xs: 5, md: 8 }, bgcolor: '#F7F7F7' }}>
            <Container maxWidth='lg'>
              <Grid container >

                {
                  restNews.length > 0 && (
                    restNews.map( ({ date, img, title, details, slug }) => (
                      <Grid item xs={12} sm={6} sx={{ mb: 10, p: 1 }} justifyContent='center' display='flex' key={ slug }>
                          <SecondaryNews 
                            date={ date }
                            img={ img } 
                            title={ title } 
                            details={ details } 
                            link={`/noticias/${slug}`} 
                          />

                      </Grid>
                    ))

                  )
                }

              </Grid>
            </Container>
          </Grid>
          

        </Container>



    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const noticias = await dbNoticias.getAllNoticias();

  noticias.sort(( a: any,b: any ) => { return new Date(b.date).getTime() - new Date(a.date).getTime() })

  const lastNews = noticias[ 0 ]
  const restNews = noticias.slice( 1, noticias.length  )

  return {
    props: {
      lastNews,
      restNews
      
    },
    revalidate: 60 * 60 * 24
  }
}


export default Noticias;