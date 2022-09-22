import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, catchError, map, tap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";

import * as AuthActions from "./auth.actions";
import {environment} from "../../../environments/environment";
import {User} from "../user.model";
import {AuthService} from "../auth.service";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(
    new Date().getTime() + expiresIn * 1000
  );
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
};


@Injectable()
export class AuthEffects {
  private FirebaseAuthUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private FirebaseSignInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  // The webApiKey value is available in the Settings of the Firebase Realtime Database.
  private webApiKey = environment.firebaseApiKey;

  // Declaration of effect handlers. They are Observables.

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          // this.FirebaseAuthUrl + this.webApiKey,
          this.FirebaseAuthUrl + this.webApiKey,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(responseData => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
          }),
        /**
         * Return an Observable that holds the login data.
         */
          map(responseData => {
            return handleAuthentication(
              +responseData.expiresIn,
              responseData.email,
              responseData.localId,
              responseData.idToken)
          }),
          catchError(errorRes => {
            return handleError(errorRes)
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          // 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
          this.FirebaseSignInUrl +
          environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(responseData => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  /**
   * Purpose: Yield specific information that is needed for logging in.
   * An effect should by default return an Action once it's done.
   * The decorator @Effect() is deprecated. See: https://ngrx.io/guide/migration/v11#the-effect-decorator
   *
   * An effect works slightly different from a function in a service.
   * The following is an ongoing Observable stream. This stream must never die, at least not as long as our
   * application is running.
   * If we would catch an error here using catchError() in the pipe() after switchMap(), which is possible,
   * the entire Observable stream would die and not be restarted again. So trying to log in again would not work
   * because the effect would not be called again to execute AuthActions.LOGIN_START.\
   * However we can use catchError in the inner Observable.
   */
  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {type: 'DUMMY'};
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });

        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return {type: 'DUMMY'};
    })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap( (authSuccessAction: AuthActions.AuthenticateSuccess) => {
      // this.authService.clearLogoutTimer();
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }
}
