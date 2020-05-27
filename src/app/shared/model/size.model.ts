import { ISize } from "../interfaces/size.interface";


export class Size implements ISize {
    constructor(
        public xs: boolean,
        public s: boolean,
        public m: boolean,
        public l: boolean,
        public xl: boolean,
        public xxl: boolean, ) { }
}