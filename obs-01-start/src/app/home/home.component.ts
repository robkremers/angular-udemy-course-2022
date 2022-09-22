import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable, map, filter } from 'rxjs';
// import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription;

  // 174. Building a Custom Observable.
  /**
   * An observer is the part of the Observable that is interested in:
   * - new data
   * - errors
   * - the Observable being completed.
   * The observer IS the listener.
   * 
   * The functionality below will have a custom counter and will provide this value, which is incremented
   * each time after 1000 msec.
   * 
   * 175. Errors & Completion.
   * Added the error.
   * Whenever a subscription encounters an error it stops. In that case unsubsription is not necessary.
   * When a subscription completes it is automatically also unsubscribed.
   * completion() does not have an argument.
   * If an error occurs before completion the completion will not be executed.
   * 
   */
 customIntervalObservable = new Observable(
    observer => {
      let count = 0;
      setInterval( () => {
        observer.next(count++);
        if (count > 7) {
          observer.complete();
        }
        if (count > 6) {
          observer.error(new Error('Count is > 6!'));
        }
      }, 1000);
    }
  );

  isEven(value: number): boolean {
    return ( value % 2 === 0);
  }

  constructor() { }

  /**
   * 173. Getting Closer to the Core of Observables.
   * A new interval that will fire a new value every second.
   * 
   * 174. Building a Custom Observable.
   * Building a custom Observable based upon Observable from RxJS.
   * 
   * 175. Errors & Completion.
   * Added error handling and completion.
   */
  ngOnInit(): void {
    // 173. Getting Closer to the Core of Observables.
    // this.paramSubscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   });

    /**
     * 175. Errors & Completion.
     * Often the error message will be sent to the backend, or an alert will be shown.
     * If it needs to be reacted to a completion a completion handler can be used.
     * 
     * 177. Understanding Operators.
     * Examples of operators. For this .pipe() is used.
     */
    this.customIntervalObservable.pipe(map( (data: number) => {
      return 'Round: ' + (data + 1);
    }));

    /**
     * 177. Understanding Operators.
     * 
     * In order to us the pipe functionality subscribe to the result of the .pipe().
     * With .pipe() you can add one or more operators.
     * If you have more than one you add them as arguments:
     * .pipe( .., ..).
     * Each argument would be an operator from 'rxjs/operators'. By the way: these days available from 'rxjs'.
     * They will execute one after the other and will perform actions on the data.
     * 
     * Note that .subscribe() is deprecated in some cases: https://rxjs.dev/deprecations/subscribe-arguments
     * In future it will only take one argument, not multiple as is the case here.
     */
    this.paramSubscription = this.customIntervalObservable.pipe(filter( (data: number) => {
      return this.isEven( (data) );
    }), map( (data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe( 
      data => {
        // Here functionality can be executed using the data.
        console.log(data);
      }, 
      error => {
        console.log(error);
        alert(error.message)
      }, () => {
        // Here some cleanup work or anything else can be done.
        console.log('Completed!');
      }
      );
  }

  /**
   * 173. Getting Closer to the Core of Observables.
   * 
   * The subscription will not die after moving to another tab, i.e. component.
   * It needs to be explicitly unsubscribed.
   */
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
