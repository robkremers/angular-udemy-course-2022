import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

/**
 * 330. Adding an Auth Feature Module.
 * It is possible to create a separate auth-routing.module.ts and declare that in RouterModule.forChild([]).
 * However it is also possible to declare the path for AuthComponent directly in the auth.module.ts file 
 * as is done here.
 * 
 * The SharedModule module is imported here AND in the app.module.ts.
 * Reason:
 * We need the LoadingSpinnerComponent. This component is declared in the SharedModule.
 * We can not declare a Component twice so we need to import the SharedModule. 
 * 
 * 333. More Lazy Loading.
 * The original path:
 *  { path: 'auth', component: AuthComponent }
 * will now be empty because it will be used in the app-routing.module.ts as part of Lazy Loading.
 * 
 */
@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent }
        ]),
        SharedModule
    ]
})
export class AuthModule {}