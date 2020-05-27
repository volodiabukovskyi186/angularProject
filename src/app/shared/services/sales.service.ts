import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/sales';
  }
  getSale(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }
  getSaleMen(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=men`);
  }
  getSaleWomen(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=women`);
  }
  setSale(sale: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, sale);
  }
  deleteSale(sale: IProduct): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${sale.id}`);
  }
  updateSale(sale: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${sale.id}`, sale);
  }
}
