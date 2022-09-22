import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

/**
 * Purpose:
 * Manage the recipes.
 * 
 * Again: Adding decorator Injector is common practice in the later Angular versions, 
 * but actually it is only necessary if you inject something here.
 * That will be done with the ShoppingListService.
 */
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe(
      "Spare Ribs", 
      "Spare Ribs, salad, sauce", 
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg", 
      [
        new Ingredient('Spare Ribs', 1),
        new Ingredient('Salad', 1)
      ]),
    new Recipe(
      "Hamburger", 
      "Hamburger, French Fries and Salad", 
      "https://cdn.pixabay.com/photo/2022/01/17/19/24/burger-6945571_960_720.jpg",
      [
        new Ingredient('Hamburger', 1),
        new Ingredient('French Fries', 20),
        new Ingredient('Salad', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * 
   * @returns a copy of the recipes array (instead of providing a reference to the actual array).
   */
  getRecipes(): Recipe[]  {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
