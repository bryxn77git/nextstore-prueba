
import { ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { IMarcas, ICategorias } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined, AddOutlined, ColorLens, Upload } from '@mui/icons-material';
import { dbMarcas, dbProducts } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField, MenuItem, Select, InputLabel, Tooltip, IconButton, OutlinedInput, Typography, SelectChangeEvent, Backdrop, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import { nextStoreApi } from '../../../api';
import { colorValidation } from '../../../utils';
import AddIcon from '@mui/icons-material/Add';

import { ChromePicker  } from 'react-color'
import { getAllCategoies } from '../../../database/dbCategories';
import { Marca } from '../../../models';


interface FormData {
    _id?       : string;
    name       : string;
    logo       : {
        url?: string,
        public_id?: string,
    };
    image      : {
        url?: string,
        public_id?: string,
    };
    categories : string[];
}

interface Props {
    marca: IMarcas;
    categorias: ICategorias[]
}

const MarcaAdminPage:FC<Props> = ({ marca, categorias }) => {

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null)
    const fileInputReflogo = useRef<HTMLInputElement>(null)
    const [newTagValue, setNewTagValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [sizeType, setSizeType] = useState('numerico');
    const [colorPicker, setColorPicker] = useState(false)
    const [colorPickerGet, setColorPickerGet] = useState('#ffffff')
    const [colorNameText, setColorNameText] = useState('')
    const [openAlert, setOpenAlert] = useState(false)
    

    const { register, handleSubmit, formState:{errors}, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: marca
    })

    const handleCategoryUpdate = ( event: any ) => {
        
        const { target: {value } } = event;

        setValue('categories', typeof value === 'string' ? value.split(',') : value, { shouldValidate: true });
    }

    const onFileSelectedLogo = async( { target }: ChangeEvent<HTMLInputElement> ) => {
        if( !target.files || target.isDefaultNamespace.length === 0 ){
            console.log('no cargo imagen')
            return;
        }

        try {
            for( const file of target.files ) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await nextStoreApi.post<{ message: string, public_id: string }>('/admin/upload', formData);
                setValue('logo', { url: data.message, public_id: data.public_id} , { shouldValidate: true })
            }
        } catch (error) {
            console.log({error})
            
        }
    }

    const onFileSelected = async( { target }: ChangeEvent<HTMLInputElement> ) => {

        if( !target.files || target.isDefaultNamespace.length === 0 ){
            return;
        }

        try {
            for( const file of target.files ) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await nextStoreApi.post<{ message: string, public_id: string }>('/admin/upload', formData);
                setValue('image', { url: data.message, public_id: data.public_id} , { shouldValidate: true })
            }
            
        } catch (error) {
            console.log({error})
            
        }
    }

    const onDeleteImageGuia = async( image: { url: string, public_id: string} ) => {
        try {
            await nextStoreApi({
                url: '/admin/delete',
                method: 'POST',
                data: image
            })
            setValue(
                'logo',
                { url: '', public_id: ' '},
                { shouldValidate: true }
            )
            fileInputReflogo.current!.value = ''
        
        } catch (error) {
            console.log(error)
        }


    }

    const onDeleteImage = async( image: { url?: string, public_id?: string} ) => {
        try {
            await nextStoreApi({
                url: '/admin/delete',
                method: 'POST',
                data: image
            })
            setValue(
                'image',
                { url: '', public_id: ' '},
                { shouldValidate: true }
            )
            fileInputRef.current!.value = ''
           
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async( form: FormData ) => {

        form.name = form.name.toLowerCase()
        
        
        if( !form.logo.url ) return alert('Mínimo una image para el logo');
        if( !form.image.url ) return alert('Mínimo una imagen para el fondo');
        setIsSaving(true);

        try {
            console.log(form)
            const resp = await nextStoreApi({
                url: '/admin/marcas',
                method: form._id ? 'PUT' : 'POST',
                data: form
            })

            if( !form._id ){
                setIsSaving(false);
                setOpenAlert(true);
                router.replace(`/admin/brands`);
            }else {
                // router.push(`/admin/products`);
                setIsSaving(false);
                setOpenAlert(true);
            }
        } catch (error) {
            console.log(error);
            setIsSaving(false);
            
        }
    }

    return (
        <>
        <AdminLayout 
            title={'Marca'} 
            subTitle={ marca.name !== undefined ? `Editando: ${ marca.name }`: 'Nuevo producto'}
            icon={<DriveFileRenameOutline />}
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        variant='contained'
                        startIcon={ marca._id ? <SaveOutlined /> : <AddIcon /> }
                        sx={{ width: '150px' }}
                        type="submit"
                    >
                        {
                            marca._id ? 'Guardar' : 'Crear'
                        }
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('name', {
                                required: true,
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />

                        <Grid container sx={{ mb: 1 }}>
                            <Grid item xs={11}>
                                <FormControl fullWidth>
                                    <InputLabel>Categorias</InputLabel>
                                    <Select
                                        multiple
                                        label='Categorias'
                                        value={getValues('categories')}
                                        // input={<OutlinedInput  />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} color='primary' sx={{ color: '#ffffff'}}/>
                                            ))}
                                            </Box>
                                        )}
                                        { ...register('categories', {required: true })}

                                        onChange={ handleCategoryUpdate }

                                        error={ !!errors.categories }
                                    >
                                    {
                                        categorias.map((type) => (
                                            <MenuItem
                                                key={type._id}
                                                value={type.name}
                                            >
                                                {type.name[0].toUpperCase() + type.name.slice(1)}
                                            </MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={1} display='flex' alignItems='center' justifyContent='center'>
                                <Tooltip title='Agregar categoria' placement="top" arrow>
                                    <IconButton size='large' href='/admin/categories/new'>
                                        <AddOutlined />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                        </Grid>                       

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }> 
                        
                        <Box display='flex' flexDirection="column" sx={{ mb: 1 }}>
                            <FormLabel sx={{ mb:1}}>Logo</FormLabel>
                            <Button
                                variant='contained'
                                fullWidth
                                startIcon={ <Upload /> }
                                disabled={ getValues('logo')?.url !== '' }
                                sx={{ mb: 3 }}
                                onClick={ () => {
                                    fileInputReflogo.current?.click()
                                } }
                            >
                                Cargar logo
                            </Button>
                            <input 
                                ref={ fileInputReflogo }
                                type='file'
                                accept='image/png image/gif image/jpeg image/webp'
                                style={{ display: 'none'}}
                                id='logoimage'
                                onChange={ onFileSelectedLogo }
                            />

                            <Chip 
                                label="Es necesario 1 logo"
                                color='error'
                                variant='filled'
                                sx={{ display: !getValues('logo')?.url ? 'flex': 'none', mb: 2 }}
                            />

                            <Grid container spacing={2}>
                                
                                {
                                    getValues('logo')?.url && (

                                    <Grid item xs={4} sm={3}>
                                        <Card>
                                            <CardMedia 
                                                component='img'
                                                className='fadeIn'
                                                image={ getValues('logo').url }
                                                alt={ getValues('logo').url }
                                            />
                                            <CardActions>
                                                <Button 
                                                    fullWidth 
                                                    color="error"
                                                    variant='contained'
                                                    onClick={ () => onDeleteImageGuia( getValues('logo') as any ) }
                                                >
                                                    Borrar
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    )
                                }
                                    
                                
                            </Grid>

                        </Box>

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes de fondo</FormLabel>
                            <Button
                                variant='contained'
                                fullWidth
                                disabled={ getValues('image')?.url !== '' }
                                startIcon={ <Upload /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>
                            <input 
                                ref={ fileInputRef }
                                type='file'
                                multiple
                                accept='image/png image/gif image/jpeg image/webp'
                                style={{ display: 'none'}}
                                onChange={ onFileSelected }
                            />

                            <Chip 
                                label="Es necesario 1 imagen de fondo"
                                color='error'
                                variant='filled'
                                sx={{ display: !getValues('image')?.url ? 'flex': 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                   getValues('image')?.url && (

                                    <Grid item xs={4} sm={3}>
                                        <Card>
                                            <CardMedia 
                                                component='img'
                                                className='fadeIn'
                                                image={ getValues('image').url }
                                                alt={ getValues('image').url }
                                            />
                                            <CardActions>
                                                <Button 
                                                    fullWidth 
                                                    color="error"
                                                    variant='contained'
                                                    onClick={ () => onDeleteImage( getValues('image') ) }
                                                >
                                                    Borrar
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    )
                                }
                                
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>


        </AdminLayout>
        <Snackbar open={openAlert} onClose={() => setOpenAlert(false)} autoHideDuration={6000} sx={{ pt: { xs: 13, sm: 16 }}} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} >
            <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
                { marca._id ? 'La marca se guardó correctamente!' : 'La marca se creó correctamente!'}
            </Alert>
        </Snackbar>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isSaving}
        >
            <CircularProgress />
        </Backdrop>
        </>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { name = '' } = query;

    let marca: IMarcas | null; 
    const categorias = await getAllCategoies();

    if( name === 'new' ){
        const tempMarca = JSON.parse( JSON.stringify( new Marca() ));
        delete tempMarca._id;
        tempMarca.logo = { url: '', public_id: ' '},
        tempMarca.image = { url: '', public_id: ' '},
        marca = tempMarca;
    } else {
        marca = await dbMarcas.getBrandByName(name.toString()); 
    } 


    if ( !marca ) {
        return {
            redirect: {
                destination: '/admin/brands',
                permanent: false,
            }
        }
    }

    return {
        props: {
            marca,
            categorias
        }
    }
}


export default MarcaAdminPage