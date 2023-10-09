import { FC, PropsWithChildren, useEffect } from "react"
// import useSWR from 'swr'
import Head from "next/head"
import { Footer, Navbar, SideMenu } from "../ui"
import { useMediaQuery, useTheme } from "@mui/material";
import { syscomApi } from "../../api";

interface Props {
    title: string,
    pageDescription: string,
    imageFullUrl?: string,
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const MainLayout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, imageFullUrl }) => {

    const theme = useTheme();
    const showToolbar = useMediaQuery(theme.breakpoints.up('sm')) ? '140px auto 0px auto' : '100px auto 0px auto';

    


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
                   <meta name="og:image" content={imageFullUrl}/>
                )
            }

  
            

        </Head>

        <nav>
            <Navbar />
        </nav>

        <SideMenu />

        <main style={{
            margin: showToolbar,
            // maxWidth: '1536px',
            // padding: '0px 0px',
        
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