import { ICategory } from '../interfaces/category.interface';

export class Category implements ICategory {
    constructor(
                public id: number,
                public nameUA: string,
                public nameEN: string, ) {}
}
