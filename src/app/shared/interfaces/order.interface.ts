import { IProduct } from './product.interface';

export interface IOrder {
    id: number;
    product: IProduct;
    productPrice: number;
    orderSize: string;
    count: number;
}