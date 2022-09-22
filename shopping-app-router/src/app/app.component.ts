import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-app';
  chosenItem: string = "recipes";

  /**
   * 
   * @param chosenItem parameter is set in child-component header.component.
   */
  onItemChosen(chosenItem: string) {
    this.chosenItem = chosenItem;
    console.log("chosen item: " + this.chosenItem);
  }
}
