import { Typography, Divider } from '@mui/material';
import { FC } from 'react';

interface Props {
    date: string;
    monthLocation?: 'left' | 'right';
    yearLocation?: 'left' | 'right';
    dayLocation?: 'left' | 'right';
    monthSize?: 'h4' | 'h5';
    daySize?: 'h3' | 'h4';
}

const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

export const DatesFormat: FC<Props> = ({ date, monthLocation = 'left', yearLocation = 'left', dayLocation = 'left', monthSize = 'h4', daySize = 'h3' }) => {

    const dateFormat = new Date(date);

  return (
    <>
        <Typography variant={monthSize} fontWeight={400} color='#8C0712' sx={{ textAlign: monthLocation, mb: 1}}>{ meses[dateFormat.getMonth()] }</Typography>

        <Divider sx={{ width: '100%', borderColor: '#8C0712' }} textAlign={yearLocation}>
            <Typography variant='subtitle2' fontWeight={900} color='rgba(64, 64, 64, 0.3)' >{ dateFormat.getFullYear() }</Typography>
        </Divider>

        { 
            dateFormat.getDate() < 10  ? (
                <Typography variant={daySize} fontWeight={900} color='#606060' sx={{ textAlign: dayLocation}}>{`0${dateFormat.getDate()}`}</Typography>
            ) : (
                <Typography variant={daySize} fontWeight={900} color='#606060' sx={{ textAlign: dayLocation}}>{ dateFormat.getDate() }</Typography>
            )   
        }
    </>
  )
}
