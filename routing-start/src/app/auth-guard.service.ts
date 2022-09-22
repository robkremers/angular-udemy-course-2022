import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * 147. Protecting Routes with canActivate.
 * 
 * Purpose:
 * - Regulate access to a given route.
 * 
 * Note:
 * - The course leader prefers to omit 'Service' in the classname.
 * - This functionality is to be executed before a route is loaded so the input for method canActivate
 *  is given by Angular.
 * 
 * Functionality:
 * - Method canActivate can return, with '|' meaning 'or':
 *  - a boolean
 *  - a UrlTree
 *  - a Observable<boolean | UrlTree>
 *  - a Promise<boolean | UrlTree>
 *    - A promise is a JavaScript object that may produce a value at some point in time.
 *    - Promises are simplify deferred and asynchronous computations. A promise represents an operation that hasn't completed yet. 
 * 
 * CanActivate can run:
 * - asynchronously (e.g. because somewhere a timeout is used), returning an Observable or a Promise
 * - synchronously.
 * 
 * Resource:
 * - https://dev.to/techiediaries/angular-10-promise-by-example-bne
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService, 
    private router: Router
    ) { }

  /**
   * Purpose:
   * - Check whether the user is logged in or not.
   * - If the user is not authenticated the user needs to be navigated away from the functionality.
   *    - In this case the user will be redireced to the root.
   * - This method can be used as an attribute in the configuration of a route in app-routing.module.ts.
   * 
   * @param route 
   * @param state 
   * @returns Promise
   */
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.authService.isAuthenticated()
    .then(
      (authenticated: boolean) => {
        if (authenticated) {
          return true;
        }
        // Alternatively also 'false' could have been returned.
        // In this setup the user will be redirected to the root.
        this.router.navigate(['/']);
      }
    );
  }

  /**
   * Purpose:
   * - Check whether the user is logged in or not.
   * - This method can be used as an attribute in the configuration of a route in app-routing.module.ts. 
   *   The method is intended for the nested routes.
   * 
   * @param route 
   * @param state 
   * @returns Promise
   */
  canActivateChild(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.canActivate(route, state);
    }
}
