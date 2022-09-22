import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService, 
    // private loggingService: LoggingService
    ) {
  }

  ngOnInit(): void {
    /**
     * Here a copy of shoppingListService.ingredients[] is received. 
     */
    this.ingredients = this.shoppingListService.getIngredients();
    /**
     * When a new ingredient has been added this will added to ShoppinglistService.ingredients.
     * But since a copy of shoppingListService.ingredients[] is received (see above comment) this
     * copy needs to be renewed.
     */
    this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );

      // this.loggingService.printlog('Hello from ShoppingListComponent ngOnInit!');
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
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
