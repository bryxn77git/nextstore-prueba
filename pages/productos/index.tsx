import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { useState, useEffect } from 'react';
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"

import { useMediaQuery, useTheme } from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import { useProducts } from "../../hooks";
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';

const colorsInitial = [
  { color: '#cccccc' },
  { color: '#515484' },
  { color: '#785413' },
  { color: '#112564' },
  { color: '#678954' },
  { color: '#425784' },
]

const Products = () => {

  const { products, isLoading } = useProducts('/products');

    const theme = useTheme();
    const winsowsSize = useMediaQuery(theme.breakpoints.up('sm')) ? 'h6' : 'subtitle1';

  const [sort, setSort] = useState('a-z');
  const [brands, setBrands]: any = useState([]);
  const [sizes, setSizes]: any = useState([]);
  const [colors, setColors]: any = useState([]);
  const [colorSelected, setColorSelected] = useState( colorsInitial.map( () => false ))

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };


  const handleShowBrand = (e: any, checked: boolean) => {

    const brandAdded = e.target.labels[0].innerText;

    if(checked){
        if(brands.find( (brand: string) => brand === brandAdded)){
          setBrands([e.target.id]);
        }else{
          setBrands([...brands, brandAdded]);
        }
    }else{
        if(brands.length === 1){
            setBrands([]);
        }else{
            let arr = brands.filter((brand: string) => brand !== brandAdded)
            setBrands(arr)
        }         
    }
  }

    const handleShowSize = (e: any, checked: boolean) => {

      const sizeAdded = e.target.labels[0].innerText;

      if(checked){
          if(sizes.find( (size: string) => size === sizeAdded)){
            setSizes([e.target.id]);
          }else{
            setSizes([...sizes, sizeAdded]);
          }
      }else{
          if(sizes.length === 1){
              setSizes([]);
          }else{
              let arr = sizes.filter((size: string) => size !== sizeAdded)
              setSizes(arr)
          }         
      }

  }

  const changeStateColor = ( position: number, colorAdded: string, checked: boolean ) => { 

    if(!checked){
        if(colors.find( (color: string) => color === colorAdded)){
          // setColors(colors);
        }else{
          setColors([...colors, colorAdded]);
        }
    }else{
        if(colors.length === 1){
            setColors([]);
        }else{
            let arr = colors.filter((color: string) => color !== colorAdded)
            setColors(arr)
        }         
    }

    let newArray = colorSelected;

    newArray[position] = !colorSelected[position];

    setColorSelected( [...newArray] );

  }
  


  return (
    <ShopLayout title='Next Store Uniforms - Inicio' pageDescription={'Encuentra los mejores uniformes para tu empresa'} >
      
      <Grid container justifyContent='center' className='main-grid'>

      <Grid
        container
        sx={{ pt: {xs: 1, md: 10} }} 
        display='flex' 
        justifyContent='center'
        className="home-grid"
      >
        <Grid item xs={12} md={3} sx={{ pl: {xs: 0, md: 5 }, mb: 5}} >
          <Grid sx={{ backgroundColor: '#f2f2f2', p: 2  }} >
            <Box display='flex' justifyContent='center' sx={{ pb: 1 }}>
              <Typography variant={winsowsSize} fontWeight={600} color='text.secondary'>Todos los productos</Typography>
            </Box>
            <Box display='flex' justifyContent='center'>
              <Divider sx={{ mt: 1, mb: 2, width: '100%', height: 5 }}/>           
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel >Ordenar</InputLabel>
              <Select
                value={sort}
                label="Ordenar"
                onChange={handleChange}
              >
                <MenuItem value={'a-z'} >A-Z</MenuItem>
                <MenuItem value={'z-a'}>Z-A</MenuItem>
                <MenuItem value={'populares'}>Populares</MenuItem>
              </Select>
            </FormControl>

            <Box display='flex' justifyContent='center'>
              <Divider sx={{ mt: 2 , mb: 2, width: '100%' }}/>           
            </Box>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography color='text.secondary'>Marcas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Dickies" onChange={ handleShowBrand } />
                  <FormControlLabel control={<Checkbox />} label="Red Kap" onChange={ handleShowBrand }/>
                  <FormControlLabel control={<Checkbox />} label="Unitam" onChange={ handleShowBrand }/>
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography color='text.secondary'>Tallas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="S" onChange={ handleShowSize } />
                  <FormControlLabel control={<Checkbox />} label="M" onChange={ handleShowSize }/>
                  <FormControlLabel control={<Checkbox />} label="L" onChange={ handleShowSize }/>
                  <FormControlLabel control={<Checkbox />} label="XL" onChange={ handleShowSize }/>
                  <FormControlLabel control={<Checkbox />} label="2XL" onChange={ handleShowSize }/>
                </FormGroup>
                
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography color='text.secondary'>Colores</Typography>
              </AccordionSummary>
              <AccordionDetails>

                {
                  colorsInitial.map( ({color}, index) => (
                    <IconButton onClick={ () => { changeStateColor(index, color, colorSelected[index]) } } key={index}>
                      <Avatar sx={{ bgcolor: color, width: 24, height: 24 }}>
                        { colorSelected[index] ? (
                          <CheckIcon />
                          ) : ''
                        }
                      </Avatar>
                    </IconButton>
                  ))
                }
                

              </AccordionDetails>
            </Accordion>
            

          </Grid>
        </Grid>

        <Grid item xs={12} md={9}  sx={{ pl: {xs: 1, md: 10}, pr: {xs: 1, md: 10}}}>
          
           {
              isLoading
                ? <FullScreenLoading />
                : <ProductList products={ products } pagination />
            }
        </Grid>
      </Grid>

    </Grid>

    </ShopLayout>
  )
}

export default Products