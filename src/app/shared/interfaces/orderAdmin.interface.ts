import { IOrderUser } from './orderUser.interface';
import { IOrder } from './order.interface';


export interface IAdminOrder {
    id: number;
    totalPrice: number;
    userName: string;
    phone: string;
    city: string;
    street: string;
    house: string;
    userID: IOrderUser;
    userOrder: Array<IOrder>;
    date?: any;
}
