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
  recipeChanged = new Subject<Recipe[]>();
  
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Spare Ribs", 
  //     "Spare Ribs, salad, sauce", 
  //     "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg", 
  //     [
  //       new Ingredient('Spare Ribs', 1),
  //       new Ingredient('Salad', 1)
  //     ]),
  //   new Recipe(
  //     "Hamburger", 
  //     "Hamburger, French Fries and Salad", 
  //     "https://cdn.pixabay.com/photo/2022/01/17/19/24/burger-6945571_960_720.jpg",
  //     [
  //       new Ingredient('Hamburger', 1),
  //       new Ingredient('French Fries', 20),
  //       new Ingredient('Salad', 1)
  //     ])
  // ];

  private recipes: Recipe[] = [];
  
  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * 283. Fetching Recipes.
   * The local recipes property will contain all recipes present in the input parameter.
   * After this via this.recipeChange Subject every functionality will be informed about the new content.
   * i.d.
   * @param recipes 
   */
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
