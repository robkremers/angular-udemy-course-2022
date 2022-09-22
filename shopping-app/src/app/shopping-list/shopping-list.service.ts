import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  constructor() { }

  /**
   * 
   * @returns a copy of the ingredients array (instead of providing a reference to the actual array).
   */
  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  /**
   * Purpose:
   * - Add the ingredient to the ingredients array.
   * - Because a slice, i.e. a copy of ingredients[] is epxposed a copy of the new ingredients[] needs to be emitted.
   * 
   * @param ingredient A new ingredient that was added in shopping-edit.component.
   * 
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  /**
   * Purpose:
   * Add an array ingredient[] to the already existing ShoppingListService.ingredientsChanged.
   * 
   * Note:
   * These ingredients will be listed in shopping-list.component.html.
   * 
   * @param ingredients An array of instances of class Ingredient
   */
  addIngredients(ingredients: Ingredient[]) {
    /**
     * Here the spread input is used. Also known in Java.
     */
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
