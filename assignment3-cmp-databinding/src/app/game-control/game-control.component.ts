import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit, OnDestroy {
  // interval will be made available to a parent component.
  @Output() interval = new EventEmitter<number>();
  counter: number = 0;
  intervalTimer;

  constructor() { }

  ngOnInit(): void {
  }

  // When the method is executed an incrementing number will be emitted each second.
  onStartGame(): void {
    this.intervalTimer = setInterval( () => {
      this.interval.emit(++this.counter);
    }, 1000)
    console.log("Game started.");
    console.log(this.interval.arguments);
  }

  onStopGame(): void {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
    }
    // clearInterval(this.intervalTimer);
    this.counter = 0;
    console.log("Game stopped.");
  }

  ngOnDestroy(): void {
      clearInterval(this.intervalTimer);
  }
}
