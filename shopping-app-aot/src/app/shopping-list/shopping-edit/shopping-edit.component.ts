import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

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
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        // We only arrive here once the editing of a shopping-list element is triggered.
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
        this.shoppinglistForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    console.log('Shopping-Edit: ingredient: ' + value.amount + ' ' + value.name);
    const newIngredient = new Ingredient(value.name, value.amount );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    // 224. Resetting the Form.
    this.editMode = false;
    form.reset();
  }

  // 225. Allowing the User to Clear (Cancel) the Form.
  onClear() {
    this.editMode = false;
    this.shoppinglistForm.reset();
  }

  // 226. Allowing the Deletion of Shopping List Items.
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
