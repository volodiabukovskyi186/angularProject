import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/category.interface';
import { ISize } from '../interfaces/size.interface';
import { ISubCategory } from '../interfaces/subCategory.interface';


export class Product implements IProduct {
    constructor(
                public id: number,
                public category: ICategory,
                public subcategory: ISubCategory,
                public productPrice: number,
                public describe: string,
                public color: string,
                public size: ISize,
                public sale: boolean,
                public newCollection: boolean,
                public saleProcent?: number,
                public img?: string,
          ) {}
}
