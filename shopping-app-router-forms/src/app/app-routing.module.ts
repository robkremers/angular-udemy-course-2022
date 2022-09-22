import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

/**
 * pathMatch: 'full':
 * - Only redirect if the full path is empty.
 * 
 * 165. Adding Editing Routes.
 * The paths for the new RecipeStartComponent has been added.
 * 
 * In this implementation a wildcard route is not necessary (but could be added),
 */
const appRoutes: Routes = [
    // { path: '', component: HeaderComponent},
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 
        'recipes', 
        component: RecipesComponent,
        /**
         * 307. Adding an Auth Guard.
         * This implementation of CanActivate ensures that when not logged in every route will be redirected to '/auth'.
         */
        canActivate: [AuthGuard],
        // Angular will run the Resolvers before loading the actual content.
        children: [
            { path: '', component: RecipeStartComponent},
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent},
    { path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }