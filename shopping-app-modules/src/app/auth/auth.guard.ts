import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

/**
 * 307. Adding an Auth Guard.
 * This implementation of CanActivate ensures that when not logged in every route will be redirected to '/auth'.
 * So the other routes will be protected against non-authenticated access.
 * So it is only possible to login and not to reach other urls defined in app-routing.module.ts.
 * This Guard is declared in app-routing.module.ts.
 * 
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router) {}
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): 
        boolean | 
        UrlTree | 
        Observable<boolean | UrlTree> | 
        Promise<boolean | UrlTree> {

        return this.authService.user.pipe(
            // We want to look only at the latest instance of the User.
            // Listen to this instance only once. Therefore we don't have an ongoing listener.
            take(1),
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