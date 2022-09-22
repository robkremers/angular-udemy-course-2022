import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * 151. Passing Static Data to a Route.
 * 
 * Purpose: an example of passing static data to a component as part of a route.
 * This is set in app-routing.moodule.ts
 */
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  errorMessage: string;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  /**
   * The 'message' has been defined in app-router.module.ts.
   * 
   * The Data gives access to the data of the route.
   */
  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.data['message'];
    this.paramsSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
