import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private id: number;
  paramsSubscription: Subscription;
  /**
   * editMode:
   * - Purpose:
   *  - Informs whether the instance is used for a new recipe or whether an existing recipe is to be edited.
   *    - false: new recipe.
   *    - true: edit an existing recipe.
   */
  editMode: boolean = false;
  recipeForm: FormGroup;

  private storeSub: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  /**
   * Again:
   * - id is the dynamic parameter in the route, as defined in app-routing.module.ts.
   * - this.editMode: the id will only be defined if the recipe exists and therefore has an id.
   *  - If the id exists this component will be used to edit the recipe with the id.
   *  - If the id is undefined this component will be used to create a new recipe.
   *
   * this.editMode = params['id'] != null; // The choice of the course leader. Note '!=' vs '!=='
   */
  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] !== undefined;
        console.log('RecipeEditComponent.ngOnInit: edit mode = ' + this.editMode);
        // The initForm should only be called if the id of the recipe changes (either receives a new value or is null).
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.recipeForm);
    // As stated in the methods below the fields of the new / updated recipe are all required. So all fields have a value.
    // const newRecipe = new Recipe(
    //     this.recipeForm.value('name'),
    //     this.recipeForm.value['description'],
    //     this.recipeForm.value['imagePath'],
    //     this.recipeForm.value['ingredients']
    // );
    // Instead of creating an instance of Recipe the values, that are already present in this.recipeFrom can be added in one go.
    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, newRecipe: this.recipeForm.value}));
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  // A new ingredients instance will be created, added to this.recipeForm and in html be visible as an empty row.
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  /**
   * Navigate back one level:
   * - If editing: go back to the detail page.
   * - If adding a new recipe: go back to the Recipes page.
   */
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  /**
   * 394. Update, Delete and Add Recipes.
   * @private
   */
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // A FormArray instance is initialized with an empty array.
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // Editing an existing recipe. If not the above declared properties will remain empty.
      // const recipe = this.recipeService.getRecipe(this.id);

      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          }))
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          // if (recipe['ingredients'])
          if (recipe.ingredients !== null) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              );
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  /**
   * For now Angular can take care about ending a subscription.
   * In future situations it will be necessary to do so as done below.
   */
  ngOnDestroy(): void {
    // This is actually not necessary. Angular should take care of this. It's a leftover from months ago.
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
