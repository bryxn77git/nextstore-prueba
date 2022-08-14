import { Box, CardMedia, Divider, Grid, Link, Typography } from "@mui/material"
import { FC } from "react";
import { ICategorias } from "../../interfaces"


import { TitleUi, LinkButton, CategoryCard } from "../ui"

interface Props {
    categories: ICategorias[];
}

export const CategoryHome:FC<Props> = ({ categories }) => {

    const categoriesSize = [[12,6], [6,3], [6,3], [12,3], [6,3], [6,6]]

  return (
    <Grid item xs={12} sx={{ mt: 10, mb: 10 }} >
        <Box display='flex' justifyContent='center'> 
            <TitleUi title='CATEGORIAS'/>  
        </Box>
        <Box display='flex' justifyContent='center'> 
            <LinkButton href={'/categorias'} title={'Ver más...'} />
        </Box>
        <Box display='flex' justifyContent='center'> 
            <Divider sx={{ mt: 1, width: { xs: 150, sm: 215 }, height: 5 }}/> 
        </Box>

        <Grid container spacing={ 1 } sx={{ mt: 3}}>

            {
                categories.map( ({name, image}, index) => (
                    <Grid item xs={categoriesSize[index][0]} md={categoriesSize[index][1]} key={name}>
                        <CategoryCard href={`/productos/${name.toLocaleLowerCase()}`} alt={name} image={image} />
                    </Grid>
                ))
            }

        </Grid>
        
    </Grid>
  )
}
