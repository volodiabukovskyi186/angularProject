import { ICategory } from './category.interface';
import { ISize } from './size.interface';
import { ISubCategory } from './subCategory.interface';

export interface IProduct {
    id: number;
    category: ICategory;
    subcategory: ISubCategory;
    productPrice: number;
    describe: string;
    color: string;
    size: ISize;
    sale: boolean;
    newCollection: boolean;
    saleProcent?: number;
    img?: string;
    
}
