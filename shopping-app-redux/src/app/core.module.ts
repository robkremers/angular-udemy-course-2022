import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
/**
 * 324. Splitting Modules Correctly.
 * Services need to be imported once and after that will be available for all modules.
 * So also for the RecipesModule.
 *
 * 329. Understanding the Core Module.
 *
 * Services do not need to be exported. This is only necessary for modules.
 */
    providers: [
        /**
         * 303. Attaching the token with an interceptor.
         * Set multi: true to allow for multiple interceptors, even if at the moment only one is used.
         */
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
})
export class CoreModule { }
