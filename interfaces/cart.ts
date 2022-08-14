
export interface ICartProduct {
    _id: string;
    title: string;
    img: string;
    color?: { 
            nombre: string, 
            color: string 
    };
    talla?: string;
    slug: string;
    quantity: number;
    code: string;
}