import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceService } from '../service.service'; 


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent{

  login$!: Observable<any>;

  constructor(private aS: ServiceService, private route:Router){}

  loginToGoogle():void{
    this.login$ = this.aS.loginWithPopup()
    .pipe(tap(()=>this.route.navigateByUrl('/users')));
  }

  loginToGithub():void{
    this.login$ = this.aS.loginWithRedirect()
    .pipe(tap(()=>this.route.navigateByUrl('/users')));
  }

}
