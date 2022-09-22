import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

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
        children: [
            { path: '', component: RecipeStartComponent},
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent}
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }