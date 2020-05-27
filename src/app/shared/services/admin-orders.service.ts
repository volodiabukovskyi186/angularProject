import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdminOrder } from '../interfaces/orderAdmin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/orders';
  }
  getOrders(): Observable<Array<IAdminOrder>> {
    return this.http.get<Array<IAdminOrder>>(this.url);
  }
  postOrders(orders: IAdminOrder): Observable<Array<IAdminOrder>> {
    return this.http.post<Array<IAdminOrder>>(this.url, orders);
  }
  deleteOrders(orders: IAdminOrder): Observable<Array<IAdminOrder>> {
    return this.http.delete<Array<IAdminOrder>>(`${this.url}/${orders.id}`);
  }
  getUserOrders(): Observable<Array<IAdminOrder>> {
    let localUser = JSON.parse(localStorage.getItem('user'));
    return this.http.get<Array<IAdminOrder>>(`${this.url}?userID.id=${localUser.id}`);
  }
}
