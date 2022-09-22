import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * 202. Introduction to the Reactive Approach.
 * 
 * For Reactive Forms the library FormGroup needs to be imported and a property of that type needs to be declared.
 * 
 * 204. Reactive: Synching HTML and Form.
 * - https://angular.io/guide/reactive-forms
 *
 *  1. Register the reactive forms module in your application. This module declares the reactive-form directives that you need to use reactive forms.
 *  2. Generate a new FormControl instance and save it in the component.
 *  3. Register the FormControl in the template.

 * - https://angular.io/api/forms/FormControl
 * 
 * A form group instance has the same properties (such as value and untouched) and methods (such as setValue()) as a form control instance.
 * A form group tracks the status and changes for each of its controls, so if one of the controls changes, 
 * the parent control also emits a new status or value change.
 * 
 * 206. Reactive: Submitting the Form.
 * 207. Reactive: Adding Validation.
 * 209. Reactive: Grouping Controls.
 * 
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup; // This is an observable!!
  forbiddenUsernames: string[] = ['Chris', 'Anna'];

  /**
   * 211. Reactive: Arrays of Form Controls (FormArray).
   * The new FormArray 'hobbies' could already be initiated here with one or more FormControls.
   * 
   * 212. Reactive: Creating Custom Validators.
   * 
   * A custom validator this.forbiddenNames is created and added to the 'username' FormControl.
   * In order to work properly it needs to be bound via this.forbiddenNames.bind(this).
   * 
   * 214. Reactive: Creating a Custom Async Validator.
   * 
   * A custom validator this.forbiddenEmails is created and added to the 'email' FormControl.
   * In this case .bind(this) was not necessary.
   */
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    
    /**
     * 215. Reactive: Reacting to Status or Value Changes.
     * Again: signupForm is of type FormGroup, which is an Observable.
     * The following code will cause the entire form to be printed in the console.
     */
    this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    /**
     * 215. Reactive: Reacting to Status or Value Changes.
     * The following code will log the status of the form in the console.
     * e.g. INVALID, PENDING, VALID (when the required fields have been filled correctly).
     */
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    /**
     * 216. Reactive: Setting and Patching Values.
     * .setValue() In case all values need to be set. Not setting a field will result in an error.
     */
    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'rkremers',
    //     'email': 'robkrmers@hotmail.com'
    //   }, 
    //   'gender': 'male',
    //   'hobbies': []
    // });

    /**
     * .patchValue() in case not all values need to be set. Now only the field 'username' will be filled.
     */
    this.signupForm.patchValue({
      'userData': {
        'username': 'rkremers'
      }
    });
  }

  /**
   * 206. Reactive: Submitting the Form.
   * console.log(this.signupForm) --> will show the form in Developer Tool | Console.
   * 
   * 216. Reactive: Setting and Patching Values.
   * Resetting and immediately setting 'gender' again.
   */
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
    this.signupForm.patchValue({
      'gender': 'male'
    });
  }

  /**
   * 211. Reactive: Arrays of Form Controls (FormArray).
   * Allowing to dynamically add Form Controls.
   */
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  /**
   * 210. Fixing a bug.
   * @returns FormArray([])
   */
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  /**
   * 212. Reactive: Creating Custom Validators.
   * 
   * A validator is a functionality that is automatically executed by Angular when it checks the validity of the FormControl.
   * Now if e.g. 'Anna' is typed the Developer Tool | Elements will show: class = ng-invalid.
   */
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    /**
     * If the value is NOT part of the array the value '-1' will be returned. 
     */
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    /**
     * At this point the return should be null or be omitted.
     * Any other possibility is false.
     */
    return null;
  }

  /**
   * 214. Reactive: Creating a Custom Async Validator.
   * 
   * Below the 1500 ms will simulate that the response will take some time.
   * Effect:
   * If a value is entered in html field 'email' the class will change briefly to ng-pending before switching to
   * either ng-valid or ng-invalid.
   * 
   * a Promise is always asynchronous, while an Observable can be either synchronous or asynchronous, 
   * a Promise can provide a single value, whereas an Observable is a stream of values.
   * 
   * https://angular.io/guide/comparing-observables
   * 
   * @param control : FormControl
   */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>( (resolve, reject) => {
      setTimeout( () => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

//   Side note: Observables for Asynchronous Validator
// 11 upvotes
// Qusai · Lecture 214 · 2 years ago
// If you decide to use an Observable for an async validator like I did, then make sure that you complete the observable after emitting the data. Otherwise, the FormGroup object will be stuck on pending = true state.



// myCode:

// forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
//     return new Observable<any>(observer => {
//       setTimeout(() => {
//         const email = control.value ? control.value.toLowerCase() : '';
//         if (this.forbiddenEmailList.indexOf(email) !== -1) {
//           observer.next({forbiddenEmail: true});
//         } else {
//           observer.next(null);
//         }
//         observer.complete();
//       }, 500);
//     });
  
// Pedro
// 3 upvotes
// 2 years ago
// RxJS’s operators could simplify this. For instance:

//   forbiddenEmails: (control: FormControl): Promise<any> | Observable<any> => {
//     return of(control.value).pipe(
//       map(value => value === 'test@test.com' ? { 'emailIsForbidden': true } : null),
//       delay(1500)
//     );
//   }
}
