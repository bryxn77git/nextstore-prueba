import { FC, PropsWithChildren } from "react"
import Head from "next/head"

import { Footer, Navbar, SideMenu } from "../ui";
import { useMediaQuery, useTheme } from "@mui/material";

interface Props {
    title: string,
    pageDescription: string,
    imageFullUrl?: string,
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, imageFullUrl }) => {

    const theme = useTheme();
    const showToolbar = useMediaQuery(theme.breakpoints.up('sm')) ? '130px auto 80px auto' : '80px auto';

  return (
    <>
        <Head>
            {/* Titulo de la pagina  */}
            <title>{ title }</title>

            {/* Descripcion para ayudar con el SEO */}
            <meta name="description" content={ pageDescription }/>

            {/* sirve para ayudar a los preview en redes sociales */}
            <meta name="og:title" content={ title }/>
            <meta name="og:description" content={ pageDescription }/>

            {
                // en caso de que tenga una imagen se muestra
                imageFullUrl && (
                   <meta name="og:image" content={ imageFullUrl }/>
                )
            }
            
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

        <SideMenu />

        <main style={{
            margin: showToolbar,
            maxWidth: '1536px',
            padding: '0px 0px',
        
        }}> 
                {/* Se mostrara el contenido de las paginas */}
            { children }
        </main>
            

        <footer>
            <Footer />
        </footer>
    </>
  )
}
