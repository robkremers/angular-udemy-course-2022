import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  /**
   * 
   * @param route : ActivatedRoute: injects the currently activated route which loaded this component.
   *                - This object will give us access to the id and name passed in the URL => Selected User.
   *                - contains a lot of meta-information about the current route.
   *                - In this case the used route, defined in app.module.ts may be:
   *                  { path: 'users/:id/:name', component: UserComponent}
   */
  constructor(private route: ActivatedRoute) { }

  /**
   * Detail:
   * this.route.params (Observable subscrption; continuously waiting for input) 
   * vs this.route.snapshot.params (handover of properties once):
   * 
   * If you know that the params don't change during lifetime of the component, 
   * you don't need a subscription and can use the simpler syntax provided by the snapshot. 
   * If the params may change during lifetime, you will have to use the subscription
   */
  ngOnInit(): void {
    /**
     * This code will only be accessed at the beginning.
     * route.snapshot.params is a property.
     */
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    /**
     * This code will be necessary if the Users page is chosen and the content of the route changes.
     * route.params is an Observable.
     * Observables are a feature, added by a third party, but heavily used.
     * - allows you to easily work with asynchronous tabs.
     * - This IS an asynchronous task because the parameters of the currently loaded route might change 
     *   at some point in the future if the user clicks this link.
     *   But it is not known when, if or how long it will take. 
     * - An Observable is an easy way to subscribe to some event that might happen in the future
     *    to then execute some code when it happens without having to wait for it now.
     * 
     * 136. An Important Note about Route Observables.
     * 
     * In the background Angular will clean up this subscription once the user.component is destroyed.
     * If it wouldn't do this the subscription would live on afterwards because it is not closely
     * tied to the component.
     * When you come back to the component a new instance will be created.
     * Again: Angular cleans the subscription but from a theoretical point you would want to 
     * explicitly remove the subscription. Therefore ngOnDestroy is used.
     * Here, see below at ngOnDestroy() this is executed.
     * 
     */
    console.log('UserComponent.ngOnInit: user.id = ' + this.user.id + ', user.name = ' + this.user.name);
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
        console.log('UserComponent.ngOnInit: user.id = ' + this.user.id + ', user.name = ' + this.user.name);
      }
    );
    
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
