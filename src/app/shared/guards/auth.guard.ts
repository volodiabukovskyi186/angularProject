import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isCheck();
  }
  check:any;
  
  isCheck(): boolean {
    const user = JSON.parse(localStorage.getItem('user'))
    if (this.auth.isLogin() || user !== null && user.role == 'admin') {
      return true;
     
    }
    this.router.navigate(['login']);
    return false;

  }


}
