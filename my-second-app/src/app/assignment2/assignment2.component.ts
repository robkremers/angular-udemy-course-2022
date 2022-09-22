import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment2',
  templateUrl: './assignment2.component.html',
  styleUrls: ['./assignment2.component.css']
})
export class Assignment2Component implements OnInit {

  userName="";
  isEmpty=true;

  constructor() {
    this.userName="";
    this.isEmpty=true;
   }

  ngOnInit(): void {
  }

  onCheckIsEmpty():boolean {
    if (this.userName.length > 0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    return this.isEmpty;
  }

  onResetUsername() {
    this.userName="";
    this.isEmpty=true;
  }

}
