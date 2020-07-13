import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/product.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string;
  nameSub: string;
  dataSub$: Observable<any>
  subCategor: Subject<any> = new Subject<any>();
  arrChoose: Array<IProduct> = [];
  newSabCategor: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/product'
    this.dataSub$ = this.subCategor.asObservable();
  }
  dataSubCategory(data) {
    this.subCategor.next(data);
  }


  getProduct(catecoryName, countProduct?): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${catecoryName}&_limit=${countProduct}`);

  }
  getAdminCategor(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}`);
  }
  setProduct(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, product);
  }
  deleteProduct(product: IProduct): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${product.id}`);
  }
  upDateProduct(product: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${product.id}`, product);
  }
  getOneProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`)
  }
  getSubCategor(word): Observable<Array<IProduct>> {
    this.nameSub = word;
    return this.http.get<Array<IProduct>>(`${this.url}?subcategory.subName=${this.nameSub}`);
  }
  getProdColor(color: Array<string>, nameCateg: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${nameCateg}&color=${color[0]}&color=${color[1]}&color=${color[2]}&color=${color[3]}&color=${color[4]}&color=${color[5]}&color=${color[6]}&color=${color[7]}&color=${color[8]}&color=${color[9]}&color=${color[10]}`);
    // &subcategory.subName=${this.nameSub}
  }
  getPriceFilter(nameCateg:string,min,max): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${nameCateg}&productPrice_gte=${min}&productPrice_lte=${max}`);
  }
  getSizeFilter(nameCateg:string,sizeElem): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${nameCateg}&size.${sizeElem[0]}=true&size.${sizeElem[1]}=true`);
   
  }

}
