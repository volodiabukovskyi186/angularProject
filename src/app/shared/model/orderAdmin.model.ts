import { IAdminOrder } from "../interfaces/orderAdmin.interface";
import { IOrder } from "../interfaces/order.interface";
import { IOrderUser } from '../interfaces/orderUser.interface';


export class AdminOrder implements IAdminOrder {
    constructor(
        public id: number,
        public totalPrice: number,
        public userName: string,
        public phone: string,
        public city: string,
        public street: string,
        public house: string,
        public userID: IOrderUser,
        public  userOrder: Array<IOrder>,
        public date?:any) { }
}