import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class NewCollectionService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/newCollection";
  }
  getNew(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url)
  }
  getPersonNew(person:string):Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${person}`)
  }
  postNew(newProd: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, newProd)
  }
  deleteNew(newProd: IProduct): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${newProd.id}`)
  }
 
}

