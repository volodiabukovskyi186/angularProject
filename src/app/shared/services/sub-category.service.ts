import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubCategory } from '../interfaces/subCategory.interface';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/subcategory";
  }
  getSubCategory(): Observable<Array<ISubCategory>> {
    return this.http.get<Array<ISubCategory>>(this.url);
  }
  addSubCategory(subCAtegory:ISubCategory): Observable<Array<ISubCategory>> {
    return this.http.post<Array<ISubCategory>>(this.url,subCAtegory);
  }
  deleteSubCategory(subCAtegory:ISubCategory): Observable<Array<ISubCategory>> {
    return this.http.delete<Array<ISubCategory>>(`${this.url}/${subCAtegory.id}`);
  }
  updataSubCategory(subCAtegory:ISubCategory): Observable<Array<ISubCategory>> {
    return this.http.put<Array<ISubCategory>>(`${this.url}/${subCAtegory.id}`,subCAtegory);
  }
  
}
