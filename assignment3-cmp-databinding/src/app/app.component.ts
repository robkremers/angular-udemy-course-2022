import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment3-cmp-databinding';

  evenNumbers: number[] = [];
  oddNumbers: number[] = [];

  /**
   * The input is received from child-component game-control, parameter interval. 
   * @param firedNumber 
   */
  onInterval(firedNumber: number) {
    console.log(firedNumber);
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }
}
