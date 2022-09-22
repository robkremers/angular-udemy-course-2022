import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  paramsSubscription: Subscription;

  constructor(
      private serversService: ServersService,
      private router: Router,
      private route: ActivatedRoute
      ) { }

  ngOnInit(): void {
    // /**
    //  * If we parse a parameter, coming from a url, it will always be a string.
    //  * However the id is a number. Therefore the incoming id-string needs to be converted to a number.
    //  */
    // const id: number = parseInt(this.route.snapshot.params['id']);
    // this.server = this.serversService.getServer( id );
    // /**
    //  * The following is added to enable reacting to subsequent changes.
    //  */
    // this.paramsSubscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer( parseInt(params['id']));
    //   }
    // );
    /**
     * 152. Resolving Dynamic Data with the resolve Guard.
     * Now we will use a Resolver for the previously implemented functionality.
     * 
     * 'server' should have the same name as defined in app-routing.module.ts:
     * { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
     * --> 'server'.
     */
     this.paramsSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onEdit() {
    const id: number = parseInt(this.route.snapshot.params['id']);
    /**
     * 141. Using Query Parameters - Practice.
     * 
     * This is one approach: use the complete path.
     * However we have created nested paths. 
     */
    // this.router.navigate(['servers', this.server.id, 'edit']);

    /**
     * In the following way we  can add 'edit' to the current route. This is a relative path.
     * 
     * 142. Configuring the Handling off Query Parameters.
     * queryParamsHandling:
     * - We want to preserve the existing query parameters, like http://localhost:4206/servers/2?allowEdit=0#loading
     * - Therefore we choose to use 'preserve'.
     * - 'merge', another option, would be used to add new query parameters.
     */
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
