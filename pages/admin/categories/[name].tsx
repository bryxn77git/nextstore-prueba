
import { ChangeEvent, FC, useEffect, useRef, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { IMarcas, ICategorias } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined, AddOutlined, ColorLens, Upload } from '@mui/icons-material';
import { dbCategories, dbMarcas, dbProducts } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField, MenuItem, Select, InputLabel, Tooltip, IconButton, OutlinedInput, Typography, SelectChangeEvent, Backdrop, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import { nextStoreApi } from '../../../api';
import { colorValidation } from '../../../utils';
import AddIcon from '@mui/icons-material/Add';

import { ChromePicker  } from 'react-color'
import { getAllCategoies } from '../../../database/dbCategories';
import { Marca } from '../../../models';
import Category from '../../../models/Categories';
import { UiContext } from '../../../context/ui/UiContext';


interface FormData {
    _id?       : string;
    name       : string;
    image      : string;
}

interface Props {
    categoria: ICategorias;
}

const CategoriaAdminPage:FC<Props> = ({ categoria }) => {

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null)
    const fileInputReflogo = useRef<HTMLInputElement>(null)
    const [isSaving, setIsSaving] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const { getCategoriesMenu } = useContext(UiContext)
    

    const { register, handleSubmit, formState:{errors}, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: categoria
    })

    const onFileSelected = async( { target }: ChangeEvent<HTMLInputElement> ) => {

        if( !target.files || target.isDefaultNamespace.length === 0 ){
            return;
        }

        try {
            for( const file of target.files ) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await nextStoreApi.post<{ message: string, public_id: string }>('/admin/upload', formData);
                setValue('image', data.message , { shouldValidate: true })
            }
            
        } catch (error) {
            console.log({error})
            
        }
    }

    const onDeleteImage = async( image: string ) => {
        try {
            await nextStoreApi({
                url: '/admin/delete',
                method: 'DELETE',
                data: image
            })
            setValue(
                'image',
                '',
                { shouldValidate: true }
            )
            fileInputRef.current!.value = ''
           
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async( form: FormData ) => {

        form.name = form.name.toLowerCase()
        
        if( !form.image ) return alert('Mínimo una imagen para el fondo');
        setIsSaving(true);

        try {
            const resp = await nextStoreApi({
                url: '/admin/categories',
                method: form._id ? 'PUT' : 'POST',
                data: form
            })

            if( !form._id ){
                setIsSaving(false);
                setOpenAlert(true);
                router.replace(`/admin/categories`);
            }else {
                // router.push(`/admin/products`);
                setIsSaving(false);
                setOpenAlert(true);
            }
            getCategoriesMenu();
        } catch (error) {
            console.log(error);
            setIsSaving(false);
            
        }
    }

    return (
        <>
        <AdminLayout 
            title={'Categoria'} 
            subTitle={ categoria.name !== undefined ? `Editando: ${ categoria.name }`: 'Nueva categoria'}
            icon={<DriveFileRenameOutline />}
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        variant='contained'
                        startIcon={ categoria._id ? <SaveOutlined /> : <AddIcon /> }
                        sx={{ width: '150px' }}
                        type="submit"
                    >
                        {
                            categoria._id ? 'Guardar' : 'Crear'
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

                      

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }> 

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes de fondo</FormLabel>
                            <Button
                                variant='contained'
                                fullWidth
                                disabled={ !!getValues('image') }
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
                                sx={{ display: !getValues('image') ? 'flex': 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                   getValues('image') && (

                                    <Grid item xs={4} sm={3}>
                                        <Card>
                                            <CardMedia 
                                                component='img'
                                                className='fadeIn'
                                                image={ getValues('image') }
                                                alt={ getValues('image') }
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
                { categoria._id ? 'La categoria se guardó correctamente!' : 'La categoria se creó correctamente!'}
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

    let categoria: ICategorias | null; 

    if( name === 'new' ){
        const tempCategoria = JSON.parse( JSON.stringify( new Category() ));
        delete tempCategoria._id;
        categoria = tempCategoria;
    } else {
        categoria = await dbCategories.getCategoriesByName(name.toString()); 
    } 


    if ( !categoria ) {
        return {
            redirect: {
                destination: '/admin/categories',
                permanent: false,
            }
        }
    }

    return {
        props: {
            categoria
        }
    }
}


export default CategoriaAdminPage