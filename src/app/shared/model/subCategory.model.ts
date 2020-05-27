import { ISubCategory } from '../interfaces/subCategory.interface';



export class SubCategory implements ISubCategory {
    constructor(public id: number,
                public subName: string) { }
}