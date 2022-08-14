 
 export interface IProduct {
    _id: string;
    title: string;
    marca: string;
    img: string[];
    categorias: string[];
    // precio: number;
    descripcion: string;
    colores: { 
            nombre: string, 
            color: string,
        }[];
    tallas: string[];
    slug: string;
    tags: string[];
    visitas: number;
    codigo: string;
    guiaTallas?: string;
}

// export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'2XL'|'3XL'|'28'| '29' | '30' | '31' | '32' | '33' | '34';

// export type ValidBrand = 'Dickies' | 'Red Hat';