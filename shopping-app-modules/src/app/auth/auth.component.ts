import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

/**
 * 301. Reflecting the Auth State in the UI.
 * In case of login the user is directed to /recipes.
 * 
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        /**
         * 301. Reflecting the Auth State in the UI.
         * Here programmatic navigation is used. So not via a page action.
         */
        this.router.navigate(['/recipes']);
      }, 
      /**
       * 297. Improving Error Handling.
       * Note that the value of errorMessage is determined in authService.signup where the 
       * error is actually caught.
       * 
       * @param errorMessage 
       */
      errorMessage => {
        // console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    
    form.reset();
  }

  /**
   * 313. Using ngIf.
   * Setting error = null means that the error message (via the popup) will disappear.
   * (because of *ngIf in auth.component.html in <app-alert>).
   */
  onHandleError() {
    console.log('AuthComponent.onHandleError: setting this.error = null');
    this.error = null;
  }
}
