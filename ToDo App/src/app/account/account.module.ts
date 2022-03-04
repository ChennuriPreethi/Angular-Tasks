import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{AngularFireModule} from "@angular/fire/compat";
import { environment } from 'environments/environment';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

import { AccountRoutingModule } from './account-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminViewUserComponent } from './admin-view-user/admin-view-user.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    AdminViewUserComponent,
    AdminAddUserComponent,
    UserDashboardComponent,
    EditTaskComponent,
    HomeComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ]
})
export class AccountModule { }
