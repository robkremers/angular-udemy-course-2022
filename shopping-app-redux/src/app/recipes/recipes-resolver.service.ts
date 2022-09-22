import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, map, of, take, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";

import {Recipe} from "./recipe.model";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions) {
  }

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
   * 394. Update, Delete and Add Recipes.
   *
   * @param route
   * @param state
   * @returns
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.store.select('recipes').pipe(
      take(1), // Ensure that only one recipe is returned.
      map(recipesState => {
        return recipesState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      }));
  }

}
