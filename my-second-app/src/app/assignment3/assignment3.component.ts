import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.css']
})
export class Assignment3Component implements OnInit {
  show: boolean = true;
  buttonclicks: number[] = [];
  clickCount: number = 0;
  timeStamps: Date[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onClickToggle() {
    this.show = !this.show;
    this.clickCount++;
    this.buttonclicks.push(this.clickCount);
    this.timeStamps.push(new Date());
  }

  getBackgroundColor() {
    return this.clickCount > 5 ? 'blue' : 'white';
  }
}
