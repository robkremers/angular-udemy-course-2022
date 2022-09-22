import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

/**
 * 342. Using Environment Variables.
 * The environment will be determined for you depending on the type of environment.
 * e.g. Angular will distinguish between production and non-production environment.
 */
import {environment} from '../../environments/environment';

/**
 * 294. Preparing the Signup Request.
 * https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
 * - Here the definition of the Response Payload and the Authentication url is described.
 * 
 * 298. Sending Login Requests.
 * - https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
 * - Here the definition of the Response Payload and the Login url is described.
 *  - Now optionally element 'registered' has been added. This will only be used for the login.
 *    Therefore the '?', indicating that the element is optional, is used.
 */
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * The following url's are available in the firebase google reference:
   * - https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
   * - https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
   */
  private FirebaseAuthUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private FirebaseSignInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  // The webApiKey value is available in the Settings of the Firebase Realtime Database.
  private webApiKey = environment.firebaseApiKey;

  // This will change if the Authentication changes. Disadvantage (possible): is up permanently.
  // user = new Subject<User>();
  /**
   * 302. Adding the Token to Outgoing Requests.
   * Use BehaviorSubject() instead of Subject() because this will preserve the last emitted value.
   * See: https://www.thecodehubs.com/what-is-subject-and-behavior-subject-in-angular-13/
   * 
   * We start with 'null' because initially we are not logged in.
   * After having logged with a given user in we will be able to access that user and it's token.
   * 
   * 305. Adding Auto-login.
   * 
   * In JavaScript everything happens in memory.
   * If the (Angular) web page is refreshed the memory will be cleared. There is no connection with
   * previous sessions.
   * For handling a refresh without a restart see method handleAuthentication() below.
   */
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  /**
   * 294. Preparing the Signup Request.
   * https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
   * 
   * 297. Improving Error Handling.
   * 
   * 299. Login Error Handling.
   * 
   * 300. Creating & Storing the User Data.
   * - https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
   * - https://stackoverflow.com/questions/47537934/what-is-the-difference-between-observable-and-a-subject-in-rxjs
   * 
   * Returns: Observable with format defined via the interface AuthResponseData.
   */
  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      this.FirebaseAuthUrl + this.webApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(
        errorRes => this.handleError(errorRes)
      ),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      })
    );
  }

  /**
   * 298. Sending Login Requests.
   * - https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
   * 
   * 299. Login Error Handling.
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(this.FirebaseSignInUrl + this.webApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(errorRes => this.handleError(errorRes)
        ),
        /**
         * The use of tap allows actions without changing the response.
         */
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // The following stops the setTimeout().
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   * 306. Adding Auto-Logout.
   * This method needs to be called every time a new user is admitted to the application.
   * i.e. someone logs in. 
   * This method will ensure that after a given amount of time (expirationDuration) the 
   * session will log out. This is how the Firebase database access is set up.
   * 
   * @param expirationDuration in milliseconds. The value will be received from the Firebase setting.
   *        (normally 3600 sec).
   */
  autoLogout(expirationDuration: number) {
    console.log('expirationDuration = ' + expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    },
      expirationDuration
    );
  }

  /**
   * 300. Creating & Storing the User Data.
   * 
   * https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
   * 
   * Here a new user is created and logged in.
   * 
   * 305. Adding Auto-login.
   * 
   * @param email The email for the newly created user.
   * @param userId localId. The uid of the newly created user.
   * @param token A Firebase Auth ID token for the newly created user.
   * @param expiresIn The number of seconds in which the ID token expires. Yes, SECONDS, you moron!
   */
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      /**
       * Date().getTime() = time in msec since 1970.
       * expiresIn = time in sec. 
       *  - Is a string but in this case should be a number. Converted via the '+' in front of resData.expiresIn.
       */
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    // Here the user is set / emitted as our (new) user.
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    /**
     * 305. Adding Auto-login.
     * Adding this will store the user properties in the Local Storage once logged in.
     * This will be visible in: Developer Tool | Application | Storage | Local Storage: http://localhost:<portnumber> 
     * localStorage is a JavaScript feature.
     * - https://javascript.plainenglish.io/how-to-persist-state-with-localstorage-in-angular-42a4a47ed123
     */
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * 305. Adding Auto-login.
   * Added AuthService.autoLogin().
   * This will ensure that once logged in or signup we remain logged even if the web page is reloaded.
   * If logged out the Application | Local Storage | userData will still exist but will be out of date.
   * 
   * Called at the highest level: app.component.ts.
   */
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      // There is no data: the user (still) needs to log in.
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // This functionality will be reached if logged in and thus the userData will be available.
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log('expirationDuration = ' + expirationDuration);
      this.autoLogout(expirationDuration);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknonwn error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
