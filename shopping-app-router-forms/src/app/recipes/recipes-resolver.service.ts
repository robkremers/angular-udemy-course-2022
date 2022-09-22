import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
  })
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipeService) {}

    /**
     * 285. Resolving Data Before Loading.
     * 
     * Note:
     * this.dataStorageService.fetchRecipes() is not subscribed.
     * The reason is that the resolver will do that for me.
     * 
     * 286. Fixing a Bug with the Resolver.
     * Only fetch data from the database if no recipes are available as yet.
     * Otherwise return the already present recipes.
     * This prevents that changes during the editing of recipes will be overwritten.
     * 
     * @param route 
     * @param state 
     * @returns 
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            console.log('RecipesResolverService.resolve: No recipes are fetched.')
            return this.dataStorageService.fetchRecipes();
        } else {
            console.log('RecipesResolverService.resolve: ');
            console.log(recipes);
            return recipes;
        } 
    }

}