import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  login ={
    role: 'Admin'
  }

  constructor(private aS:ServiceService, private route:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean 
  {
    
    if(next.data[0]== this.login.role){
    return true;
    }
    else{
      window.alert("Please Log in..!!")
      return false;
    }
  }
  
}
