import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddShoppingItem(name: HTMLInputElement,amount: HTMLInputElement): void {
    console.log('Shopping-Edit: ingredient: ' + amount.value + ' ' + name.value);
    const newIngredient = new Ingredient(name.value, parseInt(amount.value.valueOf() ));
    this.shoppingListService.addIngredient(newIngredient);
  }

}
