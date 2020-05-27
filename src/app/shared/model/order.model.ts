import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';

export class Order implements IOrder {
    constructor(
        public id:number,
        public product: IProduct,
        public productPrice: number,
        public orderSize: string,
        public count: number=1) { }
}