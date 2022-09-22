import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';

/**
 * Actually should be in a separate file.
 */
interface Server {
  id: number,
  name: string,
  status: string
}

/**
 * Injectable needs to be added if a Service is injected into another Service.
 */
@Injectable({
  providedIn: 'root'
})
export class ServerResolver implements Resolve<Server> {

  // Again: we are linked to the service providing the server data.
  constructor(private serversService: ServersService) { }

  /**
   * 152. Resolving Dynamic Data with the resolve Guard.
   * 
   * the resolve method will be used in app-routing.module.ts:
   * ..
   *     { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
   * ..
   * The data that is to be received, in this case the server.id, will be stored in the routes instance,
   * defined in app-routing.module.ts.
   * 
   * @param route 
   * @param state 
   * @returns 
   */
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Server | 
                                  Observable<Server> | 
                                  Promise<{ id: number; name: string; status: string; }> {
    // '+' in advance has the same effect as parseInt().
    return this.serversService.getServer(+route.params['id']);
  }
}
