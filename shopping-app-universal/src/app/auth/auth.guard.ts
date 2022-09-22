import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import {Store} from "@ngrx/store";
import { AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer';

/**
 * 307. Adding an Auth Guard.
 * This implementation of CanActivate ensures that when not logged in every route will be redirected to '/auth'.
 * So the other routes will be protected against non-authenticated access.
 * So it is only possible to login and not to reach other urls defined in app-routing.module.ts.
 * This Guard is declared in app-routing.module.ts.
 *
 * 364. Auth Finished (For Now...)
 * Replace 'this.authService.user.pipe()' with  this.store.select('auth').pipe()
 * and add in the pipe() the necessary extra step via map() the retrieve the user.
 *
 * app.reducer
 * --> 'auth'
 *  --> fromAuth.State
 *    --> auth.reducer.ts
 *      --> interface State containing 'user'.
 *        --> This will reach the next step: exhaustMap().
 *
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromApp.AppState>) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ):
        boolean |
        UrlTree |
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> {

        // return this.authService.user.pipe(
      return this.store.select('auth').pipe(
            // We want to look only at the latest instance of the User.
            // Listen to this instance only once. Therefore we don't have an ongoing listener.
            take(1),
            // Note that map() can be used multiple times.
            map(authState => {
              return authState.user;
            }),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                // If no user is present, i.e. we are logged out, all urls should be redirected to the login url.
                return this.router.createUrlTree(['/auth']);
            })
        );
    }
}
