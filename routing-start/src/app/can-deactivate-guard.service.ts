import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-component-deactivate';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor() { }

  /**
   * Purpose:
   * - Present a method that can be implemented at an appropriate place.
   * 
   * Notes:
   * - The attribute is set in app-routing.module.ts for the child-route ':id/edit' of 'servers'.
   * - In this application the method is implemented in edit-server.component.ts.
   * 
   * @param component 
   * @param currentRoute 
   * @param currentState 
   * @param nextState 
   * @returns 
   */
  canDeactivate(
    component: CanComponentDeactivate, 
    currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canDeactivate();
  }


}
