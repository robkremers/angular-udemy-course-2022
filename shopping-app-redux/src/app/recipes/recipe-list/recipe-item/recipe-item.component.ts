import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // The value for recipeIn is received from recipe-list.component.html: [recipeIn]="recipeElement"
  @Input() recipeIn: Recipe;
  // The value for index is received froom recipe-list.component.html: [index]="i"
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }
}
