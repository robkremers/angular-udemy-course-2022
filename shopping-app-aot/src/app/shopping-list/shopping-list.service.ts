import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

/**
 * 221. Allowing the Selection of Items in the List.
 * 
 * https://rxjs.dev/guide/subject
 * An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  /**
   * 221. Allowing the Selection of Items in the List.
   * startedEditing will contain the index of the shopping list item to be edited.
   */
  startedEditing = new Subject<number>();
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
   * 222. Loading the Shopping List items into the Form.
   * @param index 
   * @returns the ingredient with the requested index.
   */
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  /**
   * Purpose:
   * - Add the ingredient to the ingredients array.
   * - Because a slice, i.e. a copy of ingredients[] is exposed a copy of the new ingredients[] needs to be emitted.
   * 
   * @param ingredient A new ingredient that was added in shopping-edit.component.
   * 
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
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
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // 226. Allowing the Deletion of Shopping List Items.
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
