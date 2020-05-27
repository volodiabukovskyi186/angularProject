import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/category';
  }
  getCategory(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url);
  }
  addCategory(category: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(this.url, category);
  }
  
}
