import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

/**
 * 350. Understanding & Adding Actions.
 * Constants are generally defined in a separate file.
 * Here the Action for the store is defined.
 *
 * 353. Dispatching Actions.
 * Add a constructor.
 *
 * 354. Multiple Actions.
 * An Action is an object and not just a string identifier. Therefore a second class is needed to handle the 2nd const ADD_INGREDIENTS.
 *
 * 355. Preparing Update & Delete Actions.
 * The payload will be the index of the ingredient in the array, which is a number.
 *
 */
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredients';
export const DELETE_INGREDIENT = '[Shopping List] Delect Ingredients';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }
}

/**
 * 359. Removing Redundant Component State Management.
 * In the constructor it is not necessary to specify the index of the ingredient in the ingredient[] because
 * the ingredient is already known.
 */
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

/**
 * 359. Removing Redundant Component State Management.
 * No constructor specifying the ingredient is necessary here because in the context where this action is used
 * the relevant ingredient is already known.
 */
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

/**
 * 358. Managing More State from NgRx.
 * It is necessary to know which ingredient needs to be edited.
 * The payload will indicate the number of the ingredient to be edited.
 */
export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {
  };
}

/**
 * 358. Managing More State from NgRx.
 * Here no specific information needs to be furthered. Just the action itself. Hence no constructor is necessary.
 */
export class StopEdit implements Action {
  readonly type = STOP_EDIT;

}

/**
 * TypeScript feature: indicates that the ShoppingListActions can be AddIngredient or AddIngredients.
 * In TypeScript it is possible to define your own types.
 */
export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
