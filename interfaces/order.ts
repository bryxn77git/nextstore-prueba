import { IUser } from './';

export interface IOrder {

    _id? : string;
    user?: IUser | string;
    orderItems: IOrderItem[];
    shippingAddress: ShippingAddress;
    numberOfItems: number;
    status  : 'pendiente' | 'en proceso' | 'finalizado';

    createdAt?: string;
    updatedAt?: string;

}

export interface IOrderItem {
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

export interface ShippingAddress {
    name      : string;
    lastname  : string;
    phone     : string;
    company?  : string;
    address   : string;
    city      : string;
    state     : string;
    commnets? : string;
    zip       : string;
}
