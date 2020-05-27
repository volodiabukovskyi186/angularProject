import { IOrderUser } from "../interfaces/orderUser.interface";

export class OrderUser implements IOrderUser {
    constructor(
                public id: string,
                public email: string) {}
}
