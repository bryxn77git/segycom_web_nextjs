import { Grid, CardMedia, Typography, Divider } from '@mui/material';
import { LinkButton } from '../ui';
import { FC } from 'react';
import { DatesFormat } from './DatesFormat';

interface Props {
    date: string;
    img: string;
    title: string;
    details: string;
    link: string;
  }

export const SecondaryNews: FC<Props> = ({ date, img, title, details, link })=> {
  return (
    <Grid container justifyContent='center' display='center' sx={{ maxWidth: 500 }}>
        
        <Grid item xs={12} md={2} sx={{ mb: { xs: 3, md: 1 }, mr: 3 }}>

            <DatesFormat date={date} yearLocation='right' daySize='h4' monthSize='h5' />
        
        </Grid>
         

        <Grid item xs={12} md={9}> 
          <Typography sx={{ mb: 1 }} variant='h5' fontWeight={600} color='#8C0712'>
            { 
                title.charAt(0).toUpperCase() + title.slice(1)
            }
          </Typography>
        

        <Typography sx={{ mb: 2 }} variant='body2' fontWeight={500} textAlign='justify' color='#404040'>
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non hendrerit arcu. Integer volutpat... */}
         { 
            details.length < 90 ? details.charAt(0).toUpperCase() + details.slice(1) : (details.charAt(0).toLocaleUpperCase() + details.slice(1)).substring(0, 90) + '...' 
         }
        </Typography>
          
        <Grid display='flex' justifyContent='end'>
            <LinkButton href={ link } title={'Más información...'} />

        </Grid>
          
        {/* <Divider sx={{ width: '100%', mt: 5 }} /> */}

      </Grid>

        <CardMedia  
            component='img'
            // alt={ products[1].title }
            image={ img }
            sx={{ maxWidth: '100%', mt: 2}}
            // className='img-zoom'
        />   



    </Grid>
  )
}
