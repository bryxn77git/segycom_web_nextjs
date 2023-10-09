import { Grid, Typography, Card, CardActionArea, CardContent, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { FC, useContext } from 'react';
import { UiContext } from '../../context';

interface Props {
    icon: any;
    title: string;
    text: string;
    img: string;
}

export const AppFunctionText: FC<Props> = ({ icon, title, text, img }) => {

    const { toggleChangeImageApp } = useContext( UiContext )
    
     const handleChangeImage = ( img: string) => {
        toggleChangeImageApp( img );
     }

  return (
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Card elevation={ 0 } sx={{ bgcolor: '#F7F7F7'}} onMouseEnter={ () => handleChangeImage(img) }>
                <CardActionArea>
                    <CardContent>
                        <Grid container direction='row' alignItems='center' justifyContent={'center'}>
                            { icon }
                            <Typography variant='h6' fontWeight={600} color='#404040' sx={{ pt:1, pl:0.5 , mb: 1 }}>{title}</Typography>

                        </Grid>
                    <Typography fontWeight={500} color='#404040' sx={{ mb: 1 }}>{text}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {/* { icon }
            <Typography variant='h6' fontWeight={600} color='#404040' sx={{ mb: 1 }}>{title}</Typography>
            <Typography fontWeight={500} color='#404040' sx={{ mb: 1 }}>{text}</Typography> */}

        </Grid>

  )
}
