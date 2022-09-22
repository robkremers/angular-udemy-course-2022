import {Ingredient} from "../../shared/ingredient.model";
// With the 'as' keyword everything in shopping-list.actions.ts will be accessible via 'ShoppingListActions'.
import * as ShoppingListActions from "./shopping-list.actions";

/**
 * 348. Getting Started with Reducers.
 *
 * The values of import parameters state and action are provided by NgRx.
 * We can start with initial values. See shopping-list.service.ts where this also happens.
 *
 * It makes sense to do this here too when we switch from services to Redux.
 * The initialState should be a JS object.
 *
 * The parameter initialState is a JS object, not a TS object. Therefore the type of the parameter will be set automatically.
 * Notice that the const initialState is used as input parameter. Again: this is a JS file and we are not in a TS class.
 *
 * 349. Adding Logic to the Reducer.
 *
 * Note that Action is imported from @ngrx/store.
 * State changes within NgRx always have to be immutable. This means that you must not change the existing State.
 * Instead return a new State.
 *
 * 350. Understanding & Adding Actions.
 * Constants are generally defined in a separate file. In this case in shopping-list.actions.ts.
 *
 * 351. Setting Up the NgRx Store.
 * - Import shopping-list.actions.ts. Wherever necessary the code is adapted.
 *
 * 356. Updating & Deleting Ingredients.
 * 357. Expanding the state.
 * 358. Managing More State from NgRx.
 *
 */

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1 // '0' would already be a valid index.
};

/**
 * 348. Getting Started with Reducers.
 * Here an advanced JS feature is used: add a default value to the input parameters of the function.
 *
 * 360. First Summary & Clean Up.
 * NgRX will automatically pass in the current state and an action it received.
 * The function shoppingListReducer() is executed whenever a new action is received.
 * The code inside the function is synchronous.
 * The design pattern is, that each time new data is returned and not the existing data.
 *
 * @param state
 * @param action
 * @returns
 */
export function shoppingListReducer(
  state = initialState, // the default State.
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        /**
         * ...state pulls out all content of the old state and adds these properties to the new State.
         * Hence in this case we return a copy of the old State.
         * Rule of Thumb: as a safety precaution always copy the old State and change as intended.
         * Adding 'action is just a first step. Needs to be expanded.
         */
        ...state,
        // Now the existing ingredients will be added to the new array of ingredients.
        ingredients: [...state.ingredients, action.payload]
      };
    /**
     * 354. Multiple Actions
     * Error: Type 'Ingredient | Ingredient[]' must have a '[Symbol.iterator]()' method that returns an iterator.ts(2488)
     * The error is fixed in shopping-list.actions.ts. But I still have to understand why / what.
     * Check this tomorrow: https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14466558#questions/11528592.
     *
     * In this case it should not be: ingredients: [...state.ingredients, action.payload]
     * because I would add an array to an array. So I would have a nested array.
     * Instead use: ingredients: [...state.ingredients, ...action.payload]
     * Using ...action.payload the elements of the array are pulled and added to the new ingredients array.
     */
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        /**
         * 356. Updating & Deleting Ingredients.
         * If only a part of the ingredient should be copied or the ingredeient would contain e.g. an id the
         * ingredient as a whole should nonetheless be copied in order to meet the design pattern
         * that existing data is immutable and new data should be returned.
         */
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      /**
       * 359. Removing Redundant Component State Management.
       * After the ingredient has been updated the state (editedIngredientIndex, editedIngredient) is reset.
       */
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        integredients: state.ingredients.filter((ingredient, ingredientIndex) => {
          return ingredientIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.START_EDIT:
      /**
       * 358. Managing More State from NgRx.
       * Again: the entire state needs to be copied, because the state now contains not just the ingredients,
       * but also information about the ingredients.
       */
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case ShoppingListActions.STOP_EDIT:
      /**
       * 358. Managing More State from NgRx.
       * Here the state is reset regarding 'editedIngredient' and 'editedIngredientIndex'.
       */
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
