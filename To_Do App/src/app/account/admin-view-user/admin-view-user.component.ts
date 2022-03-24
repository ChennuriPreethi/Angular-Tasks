import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Admininfo } from '../admininfo';
import { interval, Observable, timer } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-view-user',
  templateUrl: './admin-view-user.component.html',
  styleUrls: ['./admin-view-user.component.css']
})
export class AdminViewUserComponent implements OnInit {
  user$ = this.aS.user$;
  logout$!: Observable<any>;
  users:any[]=[];
  tasks:any[] = [];
  constructor(private aS:ServiceService,private rT:Router,private fB:FormBuilder, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        console.log(params);
        this.aS.getAllTasks(params.listId).subscribe((tasks: any[])=>{
          this.tasks=tasks;
        })
      }
    )

    this.aS.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });

    
    //emit value every 1s
    const source = interval(1000);
    const timer$ = timer(5000);
    const example = source.pipe(takeUntil(timer$),take(3));
    const subscribe = example.subscribe(val => console.log(val));
    



    // this.aS.getAllUsers()
    // interval(5000)
    // .pipe(takeUntil(this.user$))
    // .subscribe((data: any) => {
    //   this.users = data;
    // });
  }
  
  logout(): void{
    this.logout$ = this.aS.logout()
    .pipe(tap(()=>this.rT.navigateByUrl('/admin')));
  }

  }

 
  


