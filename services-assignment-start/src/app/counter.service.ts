import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private activeToInactiveCounter: number = 0;
  private inactiveToActiveCounter: number = 0;

  constructor() { }

  incrementActiveToInactive() {
    console.log('Active to Inactive: ' + ++this.activeToInactiveCounter);
  }

  incrementInActiveToActive() {
    console.log('Inactive to Active: ' + ++this.inactiveToActiveCounter);
  }
}
