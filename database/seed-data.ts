import User from '../models/User';
import bcrypt from 'bcryptjs';

interface SeedImages {
    name : string,
    url  : string,
    link : string,
}

interface SeedNoticias {
    slug: string;
    date: string;
    title: string;
    details: string;
    img: string;
}

interface SeedClientes {
    title      : string;
    logo       : string;
    background : string;
    url        : string;
    instagram  : string;
    facebook   : string;
    twitter    : string;
    youtube    : string;
}

interface SeedData {
    images: SeedImages[];
    publicidades: SeedImages[];
    noticias: SeedNoticias[];
    clientes: SeedClientes[];
    users: SeedUser[];
}

interface SeedUser {
    name     : string;
    email    : string;
    password : string;
    role     : 'admin' | 'clientA' | 'clientB' | 'clientC';
}

export const initialData: SeedData = {
    users: [
        {
            name: 'Bryan Balderrama',
            email: 'bryan.balderrama@segycom.com.mx',
            password: bcrypt.hashSync('244889'),
            role: 'admin',
        },
        {
            name: 'Alejandro Tarango',
            email: 'bryxn.alex77@gmail.com',
            password: bcrypt.hashSync('244889'),
            role: 'clientA',
        },

    ],
    images: [
        {
            name: 'publicidad1',
            url: './assets/images/publicidad1.jpg',
            link: '/',
        },
        {
            name: 'publicidad2',
            url: './assets/images/publicidad2.jpg',
            link: '/',
        },
        {
            name: 'publicidad3',
            url: './assets/images/publicidad3.jpg',
            link: '/',
        }
    ],
    publicidades: [
        {
            name: 'publicidadSegycom01',
            url: './assets/images/publicidadSegycom01.jpg',
            link: '/',
        },
        {
            name: 'publicidadSegycom02',
            url: './assets/images/publicidadSegycom02.jpg',
            link: '/',
        },
        {
            name: 'publicidadSegycom03',
            url: './assets/images/publicidadSegycom03.jpg',
            link: '/',
        },
        {
            name: 'publicidadSegycom04',
            url: './assets/images/publicidadSegycom04.jpg',
            link: '/',
        },
        {
            name: 'publicidadSegycom05',
            url: './assets/images/publicidadSegycom05.jpg',
            link: '/',
        },
        {
            name: 'publicidadSegycom06',
            url: './assets/images/publicidadSegycom06.jpg',
            link: '/',
        },
        {
            name: 'publicidadSegycom07',
            url: './assets/images/publicidadSegycom07.png',
            link: '/',
        },
        {
            name: 'publicidadSegycom08',
            url: './assets/images/publicidadSegycom08.jpg',
            link: '/',
        },
        {
            name: 'publicidadSegycom09',
            url: './assets/images/publicidadSegycom09.png',
            link: '/',
        }
    ],
    noticias: [
        {
            slug: 'titulo_de_la_nota_1',
            date: new Date("06/20/2022").toDateString(),
            title: "Titulo de la nota 1",
            details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
            img: 'http://localhost:3000/assets/home/cliente2.webp'
        },
        {
            slug: 'titulo_de_la_nota_2',
            date: new Date("11/20/2022").toDateString(),
            title: "Titulo de la nota 2",
            details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            img: 'http://localhost:3000/assets/home/cliente2.webp'
        },
        {
            slug: 'titulo_de_la_nota_3',
            date: new Date("05/05/2022").toDateString(),
            title: "Titulo de la nota 3",
            details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            img: 'http://localhost:3000/assets/home/cliente2.webp'
        },
        {
            slug: 'titulo_de_la_nota_4',
            date: new Date("04/24/2022").toDateString(),
            title: "Titulo de la nota 4",
            details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            img: 'http://localhost:3000/assets/home/cliente2.webp'
        },
        {
            slug: 'titulo_de_la_nota_5',
            date: new Date("03/28/2022").toDateString(),
            title: "Titulo de la nota 5",
            details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            img: 'http://localhost:3000/assets/home/cliente2.webp'
        },
        {
            slug: 'titulo_de_la_nota_6',
            date: new Date("02/11/2022").toDateString(),
            title: "Titulo de la nota 6",
            details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            img: 'http://localhost:3000/assets/home/cliente2.webp'
        },
        {
            slug: 'titulo_de_la_nota_7',
            date: new Date("01/09/2022").toDateString(),
            title: "Titulo de la nota 7",
            details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            img: 'http://localhost:3000/assets/home/cliente2.webp'
        },
    ],
    clientes: [
        {
            title: 'codigo tres',
            logo: './assets/plataforma/clientsList/codigo3-logo60.webp', 
            background: './assets/plataforma/clientsList/codigo3background.webp', 
            url: 'http://www.ambulanciascodigotres.com/?fbclid=IwAR1v3KgARLQ2j1oHld7DmuF03FzZWeSck7e4yk0nnHsz9vSBjQeNhlAmjpQ', 
            instagram: '', 
            facebook: 'https://www.facebook.com/ambulancias.codigotres/', 
            twitter: '', 
            youtube: '',
        },
        {
            title: 'alertia 724',
            logo: './assets/plataforma/clientsList/alertia724-logo60.webp', 
            background: './assets/plataforma/clientsList/alertia724-background.webp', 
            url: '', 
            instagram: 'https://www.instagram.com/alertia724/', 
            facebook: 'https://www.facebook.com/AmbulanciaPrivada/', 
            twitter:  '', 
            youtube: '',
        },
        {
            title: 'jet rescue',
            logo: './assets/plataforma/clientsList/jetrescue-logo60.webp', 
            background: './assets/plataforma/clientsList/jetrescue-backgroung.webp', 
            url: 'https://www.jetrescue.com.mx/', 
            instagram: '', 
            facebook: 'https://www.facebook.com/jetrescue/', 
            twitter: 'https://twitter.com/Jetrescue', 
            youtube: 'https://www.youtube.com/user/rescuejets',
        },
        {
            title: 'cruz roja',
            logo: './assets/plataforma/clientsList/cruzroja-logo60.webp', 
            background: './assets/plataforma/clientsList/cruzroja-background.webp', 
            url: 'https://www.cruzrojamexicana.org.mx/', 
            instagram: 'https://www.instagram.com/cruzroja_mx/', 
            facebook: 'https://www.facebook.com/CruzRojaMx/', 
            twitter: 'https://twitter.com/CruzRoja_MX', 
            youtube: 'https://www.youtube.com/channel/UCZEYUS1b9IoJ44SD8hK2uyw',
        },
        {
            title: 'critiq',
            logo: './assets/plataforma/clientsList/critiq-logo60.webp', 
            background: './assets/plataforma/clientsList/critiq-background.webp', 
            url: 'https://www.critiq.com.mx/', 
            instagram: 'https://www.instagram.com/critiqmx/', 
            facebook: 'https://www.facebook.com/mxcritiq/', 
            twitter: '', 
            youtube: '',
        },
        {
            title: 'dmt',
            logo: './assets/plataforma/clientsList/dmt-logo60.webp', 
            background: './assets/plataforma/clientsList/dmt-background.webp', 
            url: 'https://dmt.com.mx/', 
            instagram: '', 
            facebook: 'https://www.facebook.com/dmt.tornillos', 
            twitter: '', 
            youtube: '',
        },
        {
            title: 'gruas caba',
            logo: './assets/plataforma/clientsList/gruascaba-logo60.webp', 
            background: './assets/plataforma/clientsList/gruascaba-background.webp', 
            url: 'https://www.gruascaba.mx/', 
            instagram: 'https://www.instagram.com/gruascaba/', 
            facebook: 'https://www.facebook.com/gruascaba', 
            twitter: 'https://twitter.com/gruascaba', 
            youtube: '',
        },

    ],
}