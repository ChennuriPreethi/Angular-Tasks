import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAddUserComponent } from '../admin-add-user/admin-add-user.component';


// export interface AdminAddUserComponent{
//   canLeave:()=>boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<AdminAddUserComponent> {
  canDeactivate(
    component: AdminAddUserComponent,
    next: ActivatedRouteSnapshot,
    state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      if(component.task != ""){
        return window.confirm("There are some unsaved data. Do you really want to navigate?")
      }
    return true;
  }
  
}
