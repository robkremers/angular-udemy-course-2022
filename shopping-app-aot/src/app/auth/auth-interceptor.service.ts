import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

/**
 * 303. Attaching the token with an interceptor.
 * 
 * In this case we do not use providedIn: 'root'.
 * We have to provide the service in a way that Angular understands it.
 * This is done in app.module.ts.
 * 
 * Purpose:
 * Add the user.token to all outgoing requests.
 * 
 */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            // take(1) tells Angular that the function will only take one value from the observable.
            // this means that it is not necessary to manually unsubscribe.
            take(1),
            /**
             * The exhaustMap function waits for the first Observable to complete.
             * It will then create a new Observable which will replace the first Observable.
             * So in this case the BehaviorSubject user is replaced by the http Observable.
             * https://rxjs.dev/api/operators/exhaustMap
             * 
             * https://angular.io/guide/http
             * 
             * The HttpRequest and HttpResponse instance properties are readonly, rendering them largely immutable.
             * If you must alter a request, clone it first and modify the clone before passing it to next.handle().
             */
            exhaustMap(user => {
                /**
                 * The user can be null.
                 * The user is declared as such in AuthService.
                 * When signing up this will be the case. 
                 * For this situation pass the request without a user token. 
                 * This could be further modified e.g. for specific url's.
                 */
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    // Note that user.token is the getter method for _token.
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}