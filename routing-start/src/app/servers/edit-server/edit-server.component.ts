import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/can-component-deactivate';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  private changesSaved: boolean = false;
  private serverId: number;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }
    
    /**
     * Again: 
     * if there is any chance that the queryparams and or fragment to changed from the page you are currently on
     * you may have to use a subscription.
     * See: user.component.ts.
     * 
     * In this case it can be subscribed to queryParams and fragment.
     */
  ngOnInit(): void {
    // route.snapshot only contains data from the time the component was created.
    console.log('EditServerComponent.ngOnInit: queryParams =  ' + this.route.snapshot.queryParams);
    console.log('EditServerComponent.ngOnInit: fragment = ' + this.route.snapshot.fragment);
    
    // const id = parseInt(this.route.snapshot.params['id']);

    // For data, being received at a later date, whilst the component exists, a subscription needs to be set up.
    // this.route.params.subscribe();
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        console.log('EditServerComponent.ngOnInit: queryParams allowEdit = ' + queryParams['allowEdit']);
      }
    );
    console.log('EditServerComponent.ngOnInit: allowEdit === ' + this.allowEdit);
    this.route.fragment.subscribe();

    this.serverId = parseInt(this.route.snapshot.params['id']);
    this.server = this.serversService.getServer(this.serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    // Subscribe route params to update the id if params change.
    this.route.params.subscribe(
      (params: Params) => {
        this.serverId = params['id'];
        console.log('EditServerComponent.ngOnInit: this.serverId = ' + this.serverId);
      }
    );

    console.log('EditServerComponent.ngOnInit: serverName = ' + this.serverName + ', serverStatus = ' + this.serverStatus)
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    console.log('EditServerComponent.onUpdateServer: name = ' + this.serverName + ' is updated to ' + this.serverStatus);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  /**
   * Purpose:
   * Implements logical whether it is allowed to leave the route or not.
   * 
   * Details:
   * - can-component-deactivate.ts:
   *  - export interface CanComponentDeactivate
   *    - CanComponentDeactivate()
   *      Declaration
   * - can-deactivate-guard.service.ts:
   *  - export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>
   *      canDeactivate(
   *        component: CanComponentDeactivate,
   *        ..
   *        return component.canDeactivate();
   * - app-routing.module.ts:
   *  { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
   * 
   */
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    } 
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
        && !this.changesSaved
     ) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
