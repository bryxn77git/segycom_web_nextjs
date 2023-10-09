import { Grid, Pagination, Typography, Box } from '@mui/material';
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { IProductos } from "../../interfaces";
import { ProductCard } from "./ProductCard";
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface Props {
    products: IProductos;
    page: Dispatch<SetStateAction<string | number | string[]>>
}

export const ProductList: FC<Props> = ({ products, page }) => {
  return (
    <Grid 
      container 
      direction='row' 
      display='flex' 
    >
       {
          products.cantidad >= 0 ? (
            <Grid container sx={{ mb: 2, mt: { xs: 0, md: 1 }, px: { xs: 1, md: 0} }}>
              <Grid item xs={6} >
                  <Typography color='text.secondary' variant='subtitle2' fontWeight={600}>Encontrados: { products.cantidad } {products.cantidad > 1 ? 'productos' : 'producto'}</Typography>
              </Grid>
              
              <Grid item xs={6} display='flex' justifyContent='end'>
                  <Typography color='text.secondary' variant='subtitle2' fontWeight={600}>Página: { products.pagina } de { products.paginas }</Typography>
              </Grid>

            </Grid>

          ) : (
            <Grid container sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={6} >
                  <Typography color='text.secondary' variant='subtitle2'>No se encontro nungun producto</Typography>
              </Grid>
            </Grid>
          )
       }
      {
        products.cantidad > 0  ? (
          products.productos.map( product => (
            <Grid  key={product.producto_id} item xs={6} md={4} xl={3} sx={{ p: { xs: 0.3, md: 0.5 } }}>
              <ProductCard 
                product={ product }
              />
            </Grid>
          ))
        ) : (
          <Grid 
            container 
            direction='row' 
            display='flex' 
            justifyContent='center' 
          >
            <SearchOffIcon sx={{ color: '#f2f2f2', fontSize: 200 }}  />
          </Grid>
        )
      }

      {
        products.cantidad > 0 && (
          <Grid item xs={12} display='flex' justifyContent='center' sx={{ mt: 3 }}>

            <Pagination  count={ Number(products.paginas) } page={ Number(products.pagina) } onChange={ (event: ChangeEvent<unknown>, value: number) => page(value) } color="secondary" />
          </Grid>

        ) 
      }
    </Grid>
  )
}
