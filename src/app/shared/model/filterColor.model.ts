import { IColor } from "../interfaces/filterColors.interface";


export class Color implements IColor{
    constructor(
               public id: number,
               public color: string,
               public status: boolean){}
}