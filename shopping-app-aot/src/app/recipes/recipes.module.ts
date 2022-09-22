import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";

/**
 * 324. Splitting Modules Correctly.
 * 
 * 325. Adding Routes to Feature Modules.
 * 
 */
@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent    
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        /**
         * The *RoutingModule should always be the last module in the imports
         * to preving import inconsistencies.
         * Especially if we are using a wildcard route in the *RoutingModule.
         */
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule {

}