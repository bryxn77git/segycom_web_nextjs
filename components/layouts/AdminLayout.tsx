import { FC, PropsWithChildren } from 'react';
import { Box, Typography, Divider, Paper, Container } from '@mui/material';
import { useMediaQuery, useTheme } from "@mui/material";

import { Navbar, SideMenu } from '../ui';
import Head from 'next/head';
import { Subtitles } from '@mui/icons-material';


interface Props {
    title: string;
    subTitle: string;
    icon?: JSX.Element;
}

export const AdminLayout:FC<PropsWithChildren<Props>> = ({ children, title, subTitle, icon }) => {

    const theme = useTheme();
    const showToolbar = useMediaQuery(theme.breakpoints.up('sm')) ? '150px auto 80px auto' : '100px auto';

  return (
    <>

        <Head>
            <title>{ title }</title>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
            />  
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />  
        </Head>

        <nav>
            <Navbar />
        </nav>

        <main style={{
            margin: showToolbar,
            maxWidth: '1536px',
            padding: '0px 5px',
        
        }}> 

        <SideMenu />

            <Container maxWidth='xl'  >
            

                <Box className='fadeIn' display='flex' flexDirection='column' sx={{ bgcolor: '#F7F7F7', py: 5, px: { xs: 1, md: 3} }} >
                    <Typography variant='h5' component='h1' color='text.secondary' fontWeight='600' sx={{ mb: 1 }}>
                        { icon }
                        { title }
                    </Typography>
                    <Typography variant='subtitle1' component='h1' color='text.secondary' fontWeight='600'>
                        { subTitle }
                    </Typography>
                    { children }
                </Box>
            </Container>

        </main>


    </>
  )
}