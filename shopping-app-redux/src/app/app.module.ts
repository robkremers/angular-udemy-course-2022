import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
import {LoggingService} from './logging.service';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { StoreRouterConnectingModule} from '@ngrx/router-store';

import * as fromApp from './store/app.reducer';
import {AuthEffects} from "./auth/store/auth.effects";
import {environment} from "../environments/environment";
import {RecipeEffects} from "./recipes/store/recipe.effects";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  /**
   * 324. Splitting Modules Correctly.
   * The BrowserModule can only be imported once.
   * This is a special module because it also has some startup features.
   * In all other modules use the CommonModule.
   *
   * 330. Adding an Auth Feature Module.
   * 332. Implementing Lazy Loading.
   * Once Lazy Loading is installed the RecipesModule should not be imported anymore in app.module.ts.
   * If this is forgotten the application will not work properly anymore.
   *
   * 351. Setting Up the NgRx Store.
   * Add the ShoppingListReducer to the AppModule.
   * When adding StoreModule Angular needs to be informed which Reducers will be available.
   * Note: what is made available is a function. Not a class or Module!
   *
   * 369. Login via NgRx Effects.
   * AuthEffects is registered here.
   */
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    // Here logging is restricted to only production.
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    // Here no arguments need to be passed.
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CoreModule,
    /**
     * AppRoutingModule should always be added at the end of the imports in order
     * to prevent import inconsistencies.
     */
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule {
}
