import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountModule } from './account/account.module';
import { AuthGuard } from './account/guards/auth.guard';
import { UnsavedChangesGuard } from './account/guards/unsaved-changes.guard';
import { ServiceService } from './account/service.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AccountModule,
    AppRoutingModule
  ],
  providers: [ServiceService, AuthGuard, UnsavedChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
