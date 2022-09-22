import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

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
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  /**
   * 332. Implementing Lazy Loading.
   * 
   * Meaning of 'loadChildren':
   * Only load the code when someons wants to visit this path.
   * When creating the RecipesModule the Angular naming convention is followed. 
   * But this is not enforced. Therefore we have to tell Angular what the name of the Module class is.
   * 
   * Angular 13: 
   * - https://angular.io/guide/lazy-loading-ngmodules#lazy-loading-basics
   * 
   * After logging in you will be redirected to /recipes.
   * Now the RecipesModule will be loaded.
   * Because of 'loadChildren' it will only be loaded at that point, not sooner.
   * This is visible in Developer Tool | Network where after loading src_app_recipes_recipes_module_ts.js is loaded. This module is much smaller.
   * Everything regarding recipes (like jpeg's) is now loaded as necessary.
   * Lazy Loading should be used if a module is not loaded immediately and / or not that often. Otherwise it's of no use.
   * After implementing Lazy Loading the application needs to be reloaded.
   * 
   * The next path is an old version. Does not work anymore in Angular 13.
   * { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
   * 
   * Note: here 'import' is a promise. Hence the possible use of 'next()'.
   */
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

/**
 * 334.Preloading Lazy-Loaded Code.
 * With {preloadingStrategy: PreloadAllModules} Angular is informed:
 * - Lazy Loading is being used.
 * - Load modules as soon as possible.
 *  - When the application is idle the modules can already be loaded so when actually needed the application will react faster.
 */
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }