import {Subscription, Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggingService} from '../logging.service';
import {Ingredient} from '../shared/ingredient.model';
// The name 'fromShoppingList' is a convention that is also found in the official NgRX documentation.
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  /**
   * 352. Selecting State.
   * It is not necessary to manage the subscription here. The Observable is loosely coupled.
   * Therefore a local onDestroy() method is not necessary.
   * Angular will manage the subscription for us.
   * Because this.ingredients now is not an array anymore (the old version) but an Observable to which
   * we are subscribed we need to adapt shopping-list.component.html.
   */
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    /**
     * 352. Selecting State.
     * We are not using Redux but NgRx because it gives us extra features and deeper integration into Angular.
     * Store is a generic type. It is necessary to describe how the store looks like.
     * In this Store 'shoppingList' is the name of the key declared in AppModule.
     * The type of the data stored in this is now not the reducer function, but what this reducer yields.
     * In this case the reducer yields a state of the type Object with an 'ingredients' key holding an array of ingredients
     * as defined in shopping-list.actions.ts.
     * Therefore the value of the shoppingList part of the store is an object which will have an 'ingredients' key
     * with a corresponding value of Ingredient[].
     */
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    /**
     * 352. Selecting State.
     * Again the key 'shoppingList' has been declared in AppModule.
     * this.store.select() returns an Observable.
     *
     * We can now:
     * - get our ingredients and
     * - react to changes in our ingredients.
     *
     * 353. Dispatching Actions.
     * Currently the ingredients are only needed in the html template.
     * For that it is enough to use the 'async' pipe in the html.
     * However if they were necesssary anywhere else, e.g. in ShoppingListComponent,
     * it would be possible to create a subscription since this.store.select() returns an Observable.
     *
     * When ingredients are added via ShoppingEditComponent they will be added here immediately.
     *
     */
    this.ingredients = this.store.select('shoppingList'); // 'shoppingList' has been declared in the constructor.

    /**
     * If you need the state at any other place you can subscribe since the store is an Observable.
     */
    // this.ingredients.subscribe();
  }

  /**
   * 221. Allowing the Selection of Items in the List.
   *
   * https://rxjs.dev/guide/subject
   * An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers.
   * In this method the index of the item tobe edited will be emitted so it can be passed on.
   * The value of index will be used in the shopping-edit.component.
   *
   */
  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // Not necessary anymore. this.subscription is now of type Observable and not an ingredient[] anymore.
    // This is loosely coupled and Angular will take care of an eventual unsubscribe action.
    // this.subscription.unsubscribe();
  }

}
