import { Component, OnInit } from '@angular/core';

/**
 * 296. Addig a Loading Spinner & Error Handling Logic.
 * 
 * De template is taken from:
 *  -  https://loading.io/css/
 */
@Component({
  selector: 'app-loading-spinner',
  template: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
