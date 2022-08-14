import bcrypt from 'bcryptjs';

interface SeedProduct {
    title: string;
    marca: string;
    img: string[];
    categorias: string[];
    // precio: number;
    descripcion: string;
    colores: ColorProp[];
    slug: string;
    tallas: string[];
    tags: string[];
    visitas?: number;
    codigo: string;
    guiaTallas?: string;
}

interface SeedUser {
    name     : string;
    email    : string;
    password : string;
    role     : 'admin'|'client'
}

interface SeedImages {
    name : string,
    url  : string
}

interface SeedMarcas {
    name       : string,
    logo       : {
        url: string,
        public_id: string, 
    },
    image      : {
        url: string,
        public_id: string,
    },
    categories : string[],
}

interface SeedCategories {
    name  : string;
    image : string;
}

interface SeedVisitas {
    numero : number;
}

interface SeedCatalogos {
    name  : string;
    image : string;
    url   : string;
}

interface ColorProp {
    nombre: string, 
    color: string 
}



export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'2XL'|'3XL'|'28'| '29' | '30' | '31' | '32' | '33' | '34';


// type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats'|'camisas'|'industrial'|'manga corta';
// type ValidBrand = 'Dickies' | 'Red Hat';

interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
    images: SeedImages[];
    marcas: SeedMarcas[];
    categories: SeedCategories[];
    catalogos: SeedCatalogos[];
    visitas: SeedVisitas[];

}

export const initialData: SeedData = {
    users: [
        {
            name: 'Bryan Balderrama',
            email: 'bryan@google.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
        {
            name: 'Alejandro Tarango', 
            email: 'alejandro@google.com',
            password: bcrypt.hashSync('123456'),
            role: 'client'
        },
    ],
    images: [
        {
            name : 'slide image 01',
            url: '/assets/images/homeSwiper/inicio1.png'
        },
        {
            name : 'slide image 02',
            url: '/assets/images/homeSwiper/inicio2.png'
        },
        {
            name : 'slide image 03',
            url: '/assets/images/homeSwiper/inicio3.png'
        }
    ],
    marcas: [
        {
            name: 'dickies',
            logo: {
                url: 'assets/images/brands/dickies.png',
                public_id: 'asda6854deea'
            },
            image: {
                url: 'assets/images/brands/prueba/dickies.jpg',
                public_id: 'asda6854deesdw'
            },
            categories: ['camisas', 'hoodies', 'industrial'],
        },
        {
            name: 'assoluto',
            logo: {
                url: 'assets/images/brands/assoluto.png',
                public_id: 'asda6854deeafhg'
            },
            image: {
                url: 'assets/images/brands/prueba/assoluto.jpg',
                public_id: 'asda6854deesdwdfs'
            },
            categories: ['shirts', 'hoodies', 'industrial'],
        },
        {
            name: 'airman',
            logo: {
                url: 'assets/images/brands/airman.png',
                public_id: 'asda6854deeawet'
            },
            image: {
                url: 'assets/images/brands/prueba/airman.jpg',
                public_id: 'asda6854deesdwweer'
            },
            categories: ['camisas', 'hoodies', 'industrial'],
        },
        {
            name: 'bigbang',
            logo: {
                url: 'assets/images/brands/bigbang.png',
                public_id: 'asda6854deeayuii'
            },
            image: {
                url: 'assets/images/brands/prueba/bigbang.jpg',
                public_id: 'asda6854deesdwQzsc'
            },
            categories: ['camisas', 'hoodies', 'industrial'],
        },
        {
            name: 'dacache',
            logo: {
                url: 'assets/images/brands/dacache.png',
                public_id: 'asda6854deeaqq'
            },
            image: {
                url: 'assets/images/brands/prueba/dacache.jpg',
                public_id: 'asda6854deesdwww'
            },
            categories: ['camisas', 'hoodies', 'industrial'],
        },
        {
            name: 'bibo',
            logo: {
                url: 'assets/images/brands/bibo.png',
                public_id: 'asda6854deeaee'
            },
            image: {
                url: 'assets/images/brands/prueba/bibo.jpg',
                public_id: 'asda6854deesdwrr'
            },
            categories: ['camisas', 'hoodies', 'industrial'],
        },
        {
            name: 'unitam',
            logo: {
                url: 'assets/images/brands/unitam.png',
                public_id: 'asda6854deeatt'
            },
            image: {
                url: 'assets/images/brands/prueba/unitam.jpg',
                public_id: 'asda6854deesdwyy'
            },
            categories: ['camisas', 'hoodies', 'industrial'],
        },
        {
            name: 'berrendo',
            logo: {
                url: 'assets/images/brands/berrendo.png',
                public_id: 'asda6854deeauu'
            },
            image: {
                url: 'assets/images/brands/prueba/berrendo.jpg',
                public_id: 'asda6854deesdwii'
            },
            categories: ['camisas', 'hoodies', 'industrial'],
        },
        {
            name: 'antum',
            logo: {
                url: 'assets/images/brands/antum.png',
                public_id: 'asda6854deeaoo'
            },
            image: {
                url: 'assets/images/brands/prueba/antum.jpg',
                public_id: 'asda6854deesdwpp'
            },
            categories: ['camisas', 'hoodies', 'industrial'],
        },
        {
            name: 'redkap',
            logo: {
                url: 'assets/images/brands/redkap.png',
                public_id: 'asda6854deelll'
            },
            image: {
                url: 'assets/images/brands/prueba/redkap.jpg',
                public_id: 'asda6854deesdwxcvvvb'
            },
            categories: ['camisas', 'hoodies', 'industrial'],
        },
        
        
    ],
    visitas: [
        {
            numero: 0,
        }
    ],
    categories: [
        {
            name: 'shirts',
            image: '/assets/images/categories/categoria1.webp',
        },
        {
            name: 'pants',
            image: '/assets/images/categories/categoria2.webp',
        },
        {
            name: 'hoodies',
            image: '/assets/images/categories/categoria3.webp',
        },
        {
            name: 'hats',
            image: '/assets/images/categories/categoria4.webp',
        },
        {
            name: 'camisas',
            image: '/assets/images/categories/categoria5.webp',
        },
        {
            name: 'industrial',
            image: '/assets/images/categories/categoria6.webp',
        },
        {
            name: 'manga corta',
            image: '/assets/images/categories/categoria7.webp',
        },
    ],
    catalogos: [
        {
            name: 'bibo',
            image: '/assets/images/catalogos/bibo_portada_catalogo.png',
            url: 'https://1drv.ms/b/s!AnZaGs3JgiMzgkTh3Z5vLk2_Q3GE?e=ScaSPn'
        },
        {
            name: 'Dickies',
            image: '/assets/images/catalogos/dickies_portada_catalogo.png',
            url: 'https://1drv.ms/b/s!AnZaGs3JgiMzgkTh3Z5vLk2_Q3GE?e=ScaSP'
        },
        {
            name: 'Reimen',
            image: '/assets/images/catalogos/reimen_portada_catalogo.png',
            url: 'https://1drv.ms/b/s!AnZaGs3JgiMzgkawU6NrdCF_UROB?e=kasuRx'
        },
        {
            name: 'bibo',
            image: '/assets/images/catalogos/bibo_portada_catalogo.png',
            url: 'https://1drv.ms/b/s!AnZaGs3JgiMzgkTh3Z5vLk2_Q3GE?e=ScaSPn'
        },
    ],
    products: [
        {
            title: 'Camisa industrial manga corta',
            marca: 'Dickies',
            img: [
                '/assets/images/products/S535.webp',
                '/assets/images/products/S535-1.webp',
                '/assets/images/products/S535-2.webp',
                // '/assets/images/products/producto1-1.webp',
                // '/assets/images/products/producto1-2.webp',
                // '/assets/images/products/producto1-3.webp',
                // '/assets/images/products/producto1-4.webp'
            ],
            categorias: ['camisas'],
            // precio: 98,
            descripcion: `• Resistente a la decoloración 
            \n• Resistente a arrugas
            \n• Cuello forrado de dos piezas, con botón de presión al frente
            \n• Bolsillos frontales con botón y con división de lápiz
            \n• Logotipo de Dickies en el costado del bolsillo izquierdo y en la parte inferior del panel de ojales
            \n• Popelina de 4.25 oz, con planchado permanente, 65% poliéster / 35% algodón`,
            colores: [
                {
                    nombre: 'Black',
                    color: '#141517'
                },
                {
                    nombre: 'Dark Charcoa',
                    color: '#4c5d79'
                },
                {
                    nombre: 'Desert Sand',
                    color: '#a69e88'
                },
                {
                    nombre: 'Light Blue',
                    color: '#91b5df'
                },
                {
                    nombre: 'Dark Navy',
                    color: '#273446'
                },
                {
                    nombre: ' White',
                    color: '#fafbfc'
                }
            ],
            tallas: ['S','M','L','XL','2XL','3XL'],
            slug: 'camisa-industrial-manga-corta',
            tags: ['lavado industrial', 'resistente a las arrugas', 'poliester', 'algodón'],
            visitas: 15,
            codigo: '1546561',
            guiaTallas: '/assets/images/products/tallas/guiaTalla.jpg'

        },
        {            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto2.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta1',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '1546562',
        },
        {           title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto3.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta2',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '1546563',
        },
        {           
            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto2.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta3',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '1546564',
        },
        {           title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto3.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta4',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '1546565',
        },
        {           title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto1.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta5',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '1546566',
        },
        {           title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto2.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta6',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '1546567',
        },
        {           title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto3.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta7',
            tags: ['hoodies'],
            visitas: 4,
            codigo: '1546568',
        },
        {           title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto2.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta8',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '1546569',
        },
        {            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto1.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta9',
            tags: ['hoodies'],
            visitas: 8,
            codigo: '15465610',
        },
        {            
            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto2.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta10',
            tags: ['hoodies'],
            codigo: '15465611',
        },
        {
            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto3.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta11',
            tags: ['hoodies'],
            visitas: 1,
            codigo: '15465612',
        },
        {
            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto2.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta12',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '15465613',
        },
        {
            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto3.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta13',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '15465614',
        },
        {
            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto1.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta14',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '15465615',
        },
        {
            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto2.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta15',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '15465616',
        },
        {
            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto3.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta16',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '15465617',
        },
        {
            title: 'Short Sleeve Work Shirt',
            marca: 'Dickies',
            img: ['/assets/images/products/producto2.webp'],
            categorias: ['hoodies'],
            // precio: 98,
            descripcion: 'Adipisicing mollit qui ut cillum dolor cupidatat tempor irure qui deserunt minim. Culpa cupidatat irure commodo voluptate eu incididunt. Cupidatat incididunt excepteur occaecat veniam incididunt voluptate officia labore dolor commodo eiusmod dolore irure ex. Fugiat anim eiusmod enim aliqua adipisicing officia cillum fugiat mollit ipsum mollit elit voluptate anim. Nulla officia cupidatat nulla officia non consectetur. Quis ullamco dolore do exercitation et quis reprehenderit.',
            colores: [
                {
                    nombre: 'Gris',
                    color: '#666666'
                }
            ],
            tallas: ['M'],
            slug: 'camisa manga corta17',
            tags: ['hoodies'],
            visitas: 0,
            codigo: '15465618',
        },
    ]
}