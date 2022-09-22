import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

/**
 * 325. Adding Routes to Feature Modules.
 */
const routes: Routes = [
    {
        path:
        // This should be the first path, because we start at /recipes.
            '',
        component: RecipesComponent,
        /**
         * 307. Adding an Auth Guard.
         * This implementation of CanActivate ensures that when not logged in every route will be redirected to '/auth'.
         */
        canActivate: [AuthGuard],
        // Angular will run the Resolvers before loading the actual content.
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }