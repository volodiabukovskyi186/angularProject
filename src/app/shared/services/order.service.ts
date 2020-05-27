import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  bag: Subject<any> = new Subject<any>();
  constructor() { }
}
