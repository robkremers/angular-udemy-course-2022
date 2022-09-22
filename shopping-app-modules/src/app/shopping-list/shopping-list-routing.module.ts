import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

/**
 * 333. More Lazy Loading.
 * The path will now be used in app-routing.module.ts for Lazy Loading
 */
const routes: Routes = [
    // { path: 'shopping-list', component: ShoppingListComponent} // Original path before Lazy Loading.
    {path: '', component: ShoppingListComponent}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule {}