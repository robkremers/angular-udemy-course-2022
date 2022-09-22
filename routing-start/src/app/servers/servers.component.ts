import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  /**
   * 
   * @param serversService: ServersService: The service giving access to server data and related functionality.
   * @param router : Router; declared in app.module.ts.
   * @param route : ActivatedRoute: injects the currently activated route which loaded this component.
   *                        - contains a lot of meta-information about the current route.
   */
  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  /**
   * 132. Using Relative Paths in Progammatic Navigation.
   * In this method three possible implementations and their effects are given and commented on.
   */
  onReload() {
    /**
     * Navigate using an absolute path: '/servers'
     * - Nothing will happen, but no harm done either.
     * - Angular decides that we are already on this page so no action is necessary.
     * - Note that in itself this implementation is working.
     */
    // this.router.navigate(['/servers']);
    
    /**
     * Navigate using a relative path: 'servers'
     * - We still don't get an error whereas using routerLink this would have caused an error.
     *  - Reason:
     *    Unlike routerLink this.router.navigate does not know on which route it currently is.
     *    So nothing happens.
     *    - routerLink always knows in which component it resides, in which component template
     *      and therefore it knows what the currently loaded route is.
     * - The relative route still needs to be a route defined earlier in app.module.ts.
     */
    // this.router.navigate(['servers']);

    /**
     * Navigate using a relative path: 'servers' and tell where we currently are using relativeTo.
     * With this implementation Angular:
     * - knows what our currently active route is.
     * - should navigate relative to this active route.
     * 
     * When trying to click the 'Reload Page' button this results in the following, correct error:
     * core.mjs:6461 ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'servers/servers'
     * Error: Cannot match any routes. URL Segment: 'servers/servers' !!!
     * 
     */
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
