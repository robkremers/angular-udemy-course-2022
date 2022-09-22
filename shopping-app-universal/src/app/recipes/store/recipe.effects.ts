/**
 * 392. Fetching Recipes & Using the Resolver.
 */
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import * as RecipesActions from './recipe.actions';
import {Recipe} from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {

  private firebaseUrl: string = 'https://ng-course-recipe-book-375da-default-rtdb.europe-west1.firebasedatabase.app/';
  private firebasePostEndpoint: string = 'recipes.json';

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        this.firebaseUrl + this.firebasePostEndpoint
      )
    }),
    // The map operator will apply a function to that data and return the result
    map(recipes => {
      return recipes.map(recipe => {
        // Below the JS spread operator is used.
        console.log('DataStorageService.fetchRecipes:')
        console.log(recipe);
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  /**
   * 395. Storing Recipes via Effects.
   * This effect will be used in the header component.
   */
  @Effect({dispatch: false})
  storeRecipes = this.actions$
    .pipe(
      ofType(RecipesActions.STORE_RECIPES),
      // this allows to add the result of another Observable into this Observable.
      withLatestFrom(this.store.select('recipes')),
      /**
       * 395. Storing Recipes via Effects.
       * The structure switchMap(([actionData, recipesState]) is called array destructuring.
       * actionData: contains data from the action.
       * recipesState: contains data from the recipes store.
       *
       * Here we are only interested in the recipes.
       */
      switchMap(([actionData, recipesState]) => {
        return this.http.put(
          this.firebaseUrl + this.firebasePostEndpoint,
          recipesState.recipes
        )
      })
    );


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) {
  }

}
