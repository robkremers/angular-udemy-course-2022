import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private shoppingListService: ShoppingListService ) {
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
