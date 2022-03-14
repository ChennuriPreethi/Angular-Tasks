import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, from,Subject} from 'rxjs';
import {Accinfo} from './accinfo';
import {Userloginfo} from './userloginfo';
import { Admininfo } from './admininfo';

// Authentication

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private user = new BehaviorSubject(this.auth.authState);
  user$: Observable<firebase.User | null> = this.user.pipe(switchMap((user)=>user));
  res:any;
  url='http://localhost:3000/'
  constructor(private http:HttpClient, public auth: AngularFireAuth) { }

  
  //Admin Authentication 

  loginWithPopup(): Observable<firebase.auth.UserCredential> {
    return from(
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      );
  }

  loginWithRedirect(): Observable<void> {
    return from(
      this.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider())
      );
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }



  //User Registration

  createaccount(accinfo:Accinfo):Observable<Accinfo>{
   
    return this.http.post<Accinfo>(this.url+'api/users',accinfo)
  }

  //User Login

  userlogin(logininfo:Userloginfo):Observable<Userloginfo>{
   
    return this.http.post<Userloginfo>(this.url+'api/login',logininfo)
  }

  //Display users list

  getAllUsers(){
    return this.http.get<any>(this.url+'api/users');
  }


  //Adding a Task 

  addTask(admininfo:Admininfo,listId:string):Observable<Admininfo>{
   
    return this.http.post<Admininfo>(this.url+`api/users/${listId}/tasks`,admininfo)
  }


  //Display all Task

  getAllTasks(listId:string){
    return this.http.get<any>(this.url+`api/users/${listId}/tasks`);
  }

  getAllNCTasks(listId:string){
    return this.http.get<any>(this.url+`api/users/${listId}/taskss`);
  }

  getAllCTasks(listId:string){
    return this.http.get<any>(this.url+`api/users/${listId}/tasksss`);
  }
   
  //Edit a Task

  getCurrentData(listId:string,taskId:string)
  {
    return this.http.get<any>(this.url+`api/users/${listId}/tasks/${taskId}`);
  }


  //Updating a Task

  updatedTask(listId:string,taskId:string,data:any){
    return this.http.patch<any>(this.url+`api/users/${listId}/tasks/${taskId}`,data);
  }


  //Task completed

  complete(admininfo:Admininfo){
    return this.http.patch<Admininfo>(this.url+`api/users/${admininfo._UserID}/tasks/${admininfo._id}`,{
      completed:true
    })
  }


  //Task not completed

  notcomplete(admininfo:Admininfo){
    return this.http.patch<Admininfo>(this.url+`api/users/${admininfo._UserID}/tasks/${admininfo._id}`,{
      completed:false
    })
  }


  //Deleting a Task

  deleteTask(listId:string,taskId:string){
    return this.http.delete(this.url+`api/users/${listId}/tasks/${taskId}`);
  }

}
