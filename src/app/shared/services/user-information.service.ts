import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserInformation } from '../interfaces/userInformation.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/users';
  }
  getAllUserData(): Observable<Array<IUserInformation>> {
    return this.http.get<Array<IUserInformation>>(this.url);
  }
  getUserData(userID): Observable<Array<IUserInformation>> {
    // let userid = JSON.parse(localStorage.getItem('user'))
    return this.http.get<Array<IUserInformation>>(`${this.url}?userId=${userID}`);
  }
  sendUserData(user): Observable<Array<IUserInformation>> {
    return this.http.post<Array<IUserInformation>>(this.url,user);
  }
  upDateUserData(user): Observable<Array<IUserInformation>> {
    return this.http.put<Array<IUserInformation>>(`${this.url}/${user.id}`,user);
  }
}
