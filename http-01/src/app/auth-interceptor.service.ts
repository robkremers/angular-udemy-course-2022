import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

/**
 * 273. Introducing Interceptors.
 * 
 * - https://angular.io/api/common/http/HttpInterceptor
 * 
 * 274. Manipulating Request Objects.
 * 
 * 275. Response Interceptors.
 * 
 * 276. Multiple Interceptors.
 * The logging has been moved to Interceptor LoggingInterceptorService.
 * 
 */
@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // req.url = 'a new url'; // will not work: req.url is immutable.
        // It is possible to clone the request properties.
        // Example: keep the existing headers and append additional ones:
        const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz') });

        return next.handle(modifiedRequest);
    }
}