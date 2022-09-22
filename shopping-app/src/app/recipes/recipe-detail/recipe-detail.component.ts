import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {
  // The recipe content is received from recipes.compoent.html
  @Input() recipe: Recipe;
  stringIngredients: string = '';

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.stringIngredients = '';
    this.recipe.ingredients.forEach (
      (ingredient) => {
        this.stringIngredients += ingredient.name + ', ';
      }
    );
    console.log('Recipe ' + this.recipe.name + ' with ingredients ' + this.stringIngredients);
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
