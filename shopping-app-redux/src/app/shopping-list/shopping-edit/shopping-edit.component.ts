import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

/**
 * 221. Allowing the Selection of Items in the List.
 * The subscription is subscribed to the Subject in shopping-list.service.ts.
 * We are already receiving the content of the ShoppinglistService.
 * Now we also receive the element index of the ShoppingList if this element is to be edited.
 *
 * 222. Loading the Shopping List items into the Form.
 * The ingredient item to be edited will be received and given to the local property editedItem.
 *
 * 223. Updating existing Items.
 * If on an element on the shopping list in shopping-list component is clicked,
 * we receive the index of the item, since we are subscribed to the 'startedEditing' Subject.
 * Now the item to be edited can be received from the shoppingListService.
 * The shoppinglistForm, which connects to the html, will receive the content of the ingredient.
 * Now the content of the shoppinglist item can be updated and sent to the shoppinglist service.
 *
 * 353. Dispatching Actions.
 * Inject the ShoppingList Store via the constructor as defined via the StoreModule in AppModule.
 */
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') shoppinglistForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    /**
     * 358. Managing More State from NgRx.
     * The stateData is defined in shopping-list.reducer.ts: interface State.
     */
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppinglistForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    console.log('Shopping-Edit: ingredient: ' + value.amount + ' ' + value.name);
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      /**
       * 353. Dispatching Actions.
       * If a new ingredient is added it is dispatched to the shoppingList store, declared in AppModule.
       */
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    // 224. Resetting the Form.
    this.editMode = false;
    form.reset();
  }

  // 225. Allowing the User to Clear (Cancel) the Form.
  // 358. Managing More State from NgRx. Inform the store that the editing has finished.
  onClear() {
    this.editMode = false;
    this.shoppinglistForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  // 226. Allowing the Deletion of Shopping List Items.
  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  // 358. Managing More State from NgRx.
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
