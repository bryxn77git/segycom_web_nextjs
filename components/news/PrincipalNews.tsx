import { Typography, Divider, CardMedia, Grid } from '@mui/material';
import { LinkButton } from "../ui"
import { FC } from 'react';
import { DatesFormat } from './DatesFormat';

interface Props {
  date: string;
  img: string;
  title: string;
  details: string;
  link: string;
}

export const PrincipalNews: FC<Props> = ({ date, img, title, details, link }) => {



  return (
    <Grid container item xs={12} sx={{ mb: 3, py: { xs: 5, md: 8 },  px: { xs: 1, md: 10 }, bgcolor: '#F7F7F7' }}>
      

      <Grid item xs={12} md={6} sx={{ pl: { xs: 0, md: 3}, mb: { xs: 3, md: 0 }}}>
        <CardMedia  
            component='img'
            // alt={ products[1].title }
            image={ img }
            sx={{ maxWidth: '100%' }}
            // className='img-zoom'
        />   
      </Grid>
      
      <Grid item xs={12} md={6} sx={{ px: { xs: 0, md: 5 }}} > 
        <Grid item xs={12} sx={{ mb: 1 }}>
        
          <DatesFormat date={date} monthLocation='right' yearLocation='right' dayLocation='right' />
          
        </Grid>
          <Typography sx={{ mb: 3 }} variant='h4' fontWeight={600} color='#8C0712'>
            { 
                title.charAt(0).toUpperCase() + title.slice(1)
            }  
          </Typography>
        {/* <Divider sx={{ width: '100%', mb: { xs: 3, md: 5 } }} /> */}

          <Typography sx={{ mb: 2 }} variant='body1' fontWeight={500} textAlign='justify' color='#404040'>
            { 
              details.length < 250 ? details.charAt(0).toUpperCase() + details.slice(1) : (details.charAt(0).toLocaleUpperCase() + details.slice(1)).substring(0, 250) + '...' 
            }
          </Typography>
          
          <Grid display='flex' justifyContent='end'>
            <LinkButton href={ link } title={'Más información...'} />

          </Grid>
          
        {/* <Divider sx={{ width: '100%', mt: 5 }} /> */}

      </Grid>
      
  </Grid> 

  )
}
