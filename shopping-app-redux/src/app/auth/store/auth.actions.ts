/**
 * 362. Setting Up Auth Reducer & Actions.
 *
 * 367. Defining the First Effect.
 * Defining Actions to be handled by NgRx/effects.
 *
 * 372. Preparing Other Auth Actions.
 * Add an Effect for signing up.
 *
 * 393. Fixing the Auth Redirect.
 */
import {Action} from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start'; // Here we want to start sending our request.
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';


export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  /**
   * In this case the properties of the paylaod are actually the properties of a user.
   * @param payload
   */
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }) {
  }
}

/**
 * In this class no constructor is needed. No data is necessary.
 * As part of this action the user needs to be set to null.
 */
export class Logout implements Action {
  readonly type = LOGOUT;
}

/**
 * 368. Effects & Error Handling.
 */
export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {
  }
}

/**
 * 370. Managing UI State in NgRx.
 * As part of the failure to login an error message (string) will be handled as part of the payload.
 */
export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {
  }
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {
  }
}

/**
 * 374. Further Auth Effects.
 * No payload needs to be processed.
 */
export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

/**
 * 375. Adding Auto-Login with NgRx.
 * Handle the localStorage via auth.effects.ts.
 */
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError
  | AutoLogin;
