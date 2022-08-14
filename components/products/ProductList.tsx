import { Grid, Pagination, Typography } from "@mui/material";
import { FC } from "react";
import { IProduct } from "../../interfaces";
import { ProductCard } from "./ProductCard";

interface Props {
    products: IProduct[];
    pagination?: boolean;
}

export const ProductList: FC<Props> = ({ products , pagination = false }) => {
  return (
    <Grid 
            container 
            direction='row' 
            display='flex' 
            justifyContent='center' 
            spacing={3}
    >
       {
          pagination && (
            <>
              {/* // TODO asignar el total de los productos */}
              <Grid item xs={6}>
                  <Typography color='text.secondary' variant='subtitle2'>Encontrados: 30 productos</Typography>
              </Grid>
              
              {/* // TODO Mostrar la pagina acrual */}
              <Grid item xs={6} display='flex' justifyContent='end'>
                  <Typography color='text.secondary' variant='subtitle2'>Página: 1</Typography>
              </Grid>

            </>

          )
       }
        {/* TODO cargar los productos de la base de datos */}
      {
        products.map( product => (
          <Grid  key={product.slug} item xs={6} md={4} display='flex' justifyContent='center' alignItems='center'>
            <ProductCard 
              product={ product }
            />
          </Grid>
        ))
      }

        {/* TODO hacer funcionar la paginacion */}
        {
          pagination && (
            <Grid item xs={12} display='flex' justifyContent='center'>

              <Pagination  count={10} color="secondary" />
            </Grid>

          ) 
        }
    </Grid>
  )
}
