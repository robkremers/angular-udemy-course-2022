import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from "./store/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  /**
   * 306. Adding Auto-Logout.
   * This method needs to be called every time a new user is admitted to the application.
   * i.e. someone logs in.
   * This method will ensure that after a given amount of time (expirationDuration) the
   * session will log out. This is how the Firebase database access is set up.
   *
   * 286. Adding Auto-Logout.
   *
   * @param expirationDuration in milliseconds. The value will be received from the Firebase setting.
   *        (normally 3600 sec).
   */
  setLogoutTimer(expirationDuration: number) {
    console.log('expirationDuration = ' + expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    },
      expirationDuration
    );
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
