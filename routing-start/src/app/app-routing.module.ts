import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

// const routes: Routes = [];

/**
 * Notes:
 * - The HomeComponent is added to the default path: ''.
 * 
 * It is possible to add parameters to the routes: 'users/:id'
 * - The colon ':' tells Angular that this is a dynamic part of the path.
 * - Warning: without ':' Angular would literally look for a route 'users/id'.
 * - As many dynamic content can be added as necessary.
 * 
 * Result: http://localhost:4206/users/1/something will work.
 * 
 * 143. Redirecting and Wildcard Routes.
 * 
 * When using the wildcard '**' any non-defined url will (after IP:portnumber)
 * will be redirected to PageNotFoundComponent.
 * Make sure that the wildcard is the last path because the paths will be scanned from top to bottom.
 * 
 * 144. Important: Redirection Path Matching.
 * 
 * By default, Angular matches paths by prefix. 
 * That means, that the following route will match both /recipes  and just / 
 *  { path: '', redirectTo: '/somewhere-else' } 
 * 
 * This route will now ALWAYS redirect you!
 * 
 * Since the default matching strategy is "prefix" , Angular checks if the path 
 * you entered in the URL does start with the path specified in the route. 
 * Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").
 * 
 * To fix this behavior, you need to change the matching strategy to "full" :
 *  { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' } 
 * 
 * Now, you only get redirected, if the full path is ''  (so only if 
 * you got NO other content in your path in this example).
 * 
 * 145. Outsourcing the Route Configuration.
 * 
 * 147. Protecting Routes with canActivate.
 * Via canActivate[] a Promise, defined in AuthGuard, will be implemented.
 * Now access to the servers will only be possible if AuthGuard will return 'true'.
 * For this the attribute 'canActivate' is used. This is defined in service class AuthGuard.
 * 
 * 148.  Protecting Child (Nested) Routes with canActivateChild.
 * In order to allow access to route 'servers, but not the child-routes of 'servers' now
 * the attribute canActivateChild is used.
 * This attribute is also defined in service class AuthGuard.
 * 
 * 151. Passing Static Data to a Route.
 * 
 * Example:
 * { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
 * 
 * So for this example for the moment the PageNotFoundComponent has been commented out.
 * Now in case of an unknown path the ErrorPageComponent will be used.
 * The actual data is set here in app-routing.module.ts.
 * 
 * 152. Resolving Dynamic Data with the resolve Guard.
 * 
 * Now we will use a Resolver that provides dynamic data that may be received asynchronously.
 * 
 */
 const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', 
    component: UsersComponent, 
    children: [
    { path: ':id/:name', component: UserComponent}
  ]},
  { path: 'servers', 
    // canActivate: [AuthGuard], 
    canActivateChild: [AuthGuard], 
    component: ServersComponent, 
    children: [
      // A Resolver is used to load dynamic data.
      // For a Resolver key-value pairs are used.
    { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
    // For a Guard an array is used.
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
  ]},
  // { path: 'not-found', component: PageNotFoundComponent},
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  { path: '**', redirectTo: '/not-found', pathMatch: 'full'}
];

/**
 * 153. Understanding Location Strategies.
 * 
 * The app has to be configured such that in case of HTTP 404 it has to return the <application>/src/index.html file.
 * This is the file containing the Angular app.
 * Otherwise the routes configured in <application>/src/app/app-routing.module.ts may not be recognized by the production server.
 * 
 * Using {useHash: true} results in:
 * http://localhost:4206/#servers 
 * http://localhost:4206/#users
 * 
 * This tells older browsers / servers that they should only look at everything BEFORE '#'.
 * So in this case: http://localhost:4206/
 * --> This will point to index.html.
 * (This is how it works by default)
 * 
 * Normally this should not be necessary.
 * 
 * 127. Setting up and Loading Routes.
 * imports: [RouterModule.forRoot(routes)] 
 * - Adds the routes to Angular.
 * 
 */
@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
