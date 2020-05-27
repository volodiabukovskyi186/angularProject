import { ISizeFilter } from '../interfaces/sizeFilter.interface';

export class SizeFilter implements ISizeFilter{
    constructor(
                public id: number,
                public size: string,
                public status: boolean) {}
};