import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

/**
 * 301. Reflecting the Auth State in the UI.
 * Here and in the html functionality is added in order to enable login.
 *
 * 364. Auth Finished (For Now...)
 * Replace 'this.authService.user.subscribe()' with  this.store.select('auth').pipe()
 * and add in the pipe() the necessary extra step via map() the retrieve the user.
 */
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    private userSub: Subscription;

    constructor(
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit(): void {
        this.userSub = this.store.select('auth').pipe(
          map(authState => {
            return authState.user;
          })
        ).subscribe(user => {
            // this.isAuthenticated = !user ? false : true;
            this.isAuthenticated = !!user; // double negation.
        });
    }

    /**
     * 282. Storing Recipes.
     * 395. Storing Recipes via Effects.
     */
    onSaveData() {
        // this.dataStorageService.storeRecipes();
      this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    /**
     * 283. Fetching Recipes.
     *
     * 285. Resolving Data Before Loading.
     * Due to using the RecipesResolver class now
     * this.dataStorageService.fetchRecipes() should be this.dataStorageService.fetchRecipes().subscribe();
     * However this is redundant.
     *
     * 392. Fetching Recipes & Using the Resolver.
     */
    onFetchData() {
        // this.dataStorageService.fetchRecipes().subscribe();
      this.store.dispatch(new RecipesActions.FetchRecipes());
    }

  /**
   * 374. Further Auth Effects.
   * Now use store instead of auth.service.logout().
   */
  onLogout() {
      this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}
