import { FC } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from "next/link";

import { MainLayout } from "../../components/layouts";

import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Link } from '@mui/material';
import { IMarcas } from '../../interfaces';
import { syscomApi } from '../../api';
import { useRouter } from 'next/router';



interface Props {
  marca: IMarcas;
  error: string;
}

const Marcas: FC<Props> = ({ marca, error }) => {

    const router = useRouter();


  return (
    <MainLayout title={"Productos"} pageDescription={"Lista de productos que ofrece la empresa Segycom"}>
      <Container maxWidth='xl'>


        <Grid container sx={{ mb: 3, px: { xs: 1, md: 3}, py: 5 ,  bgcolor: '#F7F7F7'}}>
            <Grid container spacing={3} display='flex' justifyContent='center'>
                <Grid item xs={12} md={3} justifyContent='center' alignItems='center' display='flex'>
                    <CardMedia
                        component="img"
                        sx={{ width: '100%'}}
                        image={marca.logo}
                        alt={marca.titulo}
                    />
                </Grid>
                <Grid item xs={12} md={9} >
                    <Typography gutterBottom variant="h5" sx={{ color: '#666666'}} fontWeight={600}>
                        {marca.titulo}
                    </Typography>
                    <Typography gutterBottom variant="body1" sx={{ color: '#666666'}} fontWeight={600}>
                        {marca.descripcion}
                    </Typography>
                </Grid>

            </Grid>
        </Grid>

        <Grid container sx={{ mb: 3, px: 1, py: 3 ,  bgcolor: '#F7F7F7'}} >
            <Grid container spacing={3} display='flex' justifyContent='center'>
                {
                    marca.categorias.length > 0 ? (
                          
                        marca.categorias.map( ({id, nombre, imagen}) => (     
                            <Grid item xs={6} md={3} display='flex' justifyContent='center' key={id}>
                                <NextLink href={ `/productos/${id}?categoria=${nombre.replaceAll(' ', '_').toLocaleLowerCase()}&id_categoria=${id}&marca=${router.query?.marca}&orden=topseller&pagina=1` } passHref>
                                    <Link>
                                        <Card sx={{ maxWidth: 300 }} elevation={0}>
                                            {/* <CardActionArea> */}
                                                <CardMedia
                                                    component="img"
                                                    className='img-zoom'
                                                    image={imagen !== 'https://ftp3.syscom.mx/usuarios/fotos/imagen_no_disponible.jpg' ? imagen : `${process.env.NEXT_PUBLIC_HOST_NAME}assets/products/noproduct.webp`}
                                                    alt={nombre}
                                                    />
                                                <CardContent sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex', minHeight: 90}}>
                                                    <Typography gutterBottom variant="body1" sx={{ color: '#666666'}} fontWeight={600}>
                                                        {nombre}
                                                    </Typography>
                                                </CardContent>
                                            {/* </CardActionArea> */}
                                        </Card>
                                    </Link>
                                </NextLink>
                            </Grid>
                        ))
                    
                    ) : (
                        <Grid item xs={12} display='flex' justifyContent='center' minHeight='calc(100vh - 100px)'>
                            <Typography gutterBottom variant="h5" sx={{ color: '#666666', pt: 10}} fontWeight={600}>
                                No hay categorías de esta marca
                            </Typography>
                        </Grid>
                    )
                }

            </Grid>
        </Grid>

      </Container>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {

  let error = ''
  let marca = {};

  try {

    const { data } = await syscomApi.get<IMarcas>(`marcas/${query.marca}`);
    marca = data;
        
  } catch (e) {
      error = 'error';
  }

return {
  props: {
      marca,
      error
  }
}
}

export default Marcas