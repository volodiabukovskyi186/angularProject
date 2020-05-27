import { IUserInformation } from "../interfaces/userInformation.interface";


export class UserInformation implements IUserInformation {
    constructor(
                 public id: number,
               public userId: string,
               public name: string,
               public phone: string,
               public city: string,
               public street: string,
               public house: string,
              ) {}
};