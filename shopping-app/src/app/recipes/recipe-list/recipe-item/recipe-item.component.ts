import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeIn: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onselect() {
    console.log('RecipeItemComponent: emitted recipe is ' + this.recipeIn.name);
    this.recipeService.recipeSelected.emit(this.recipeIn);
  }

}
