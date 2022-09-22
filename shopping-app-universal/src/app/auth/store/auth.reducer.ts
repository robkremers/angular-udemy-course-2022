import {User} from "../user.model";
// Again here 'AuthActions' is a container name for all classes, etc. in the file.
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

/**
 * 361. One Root State.
 *
 * initialState is the default value for state.
 *
 * 365. An Important Note on Actions.
 *
 * Any action that is dispatched will always reach all reducers.
 * As defined in app.reducer.ts.
 * There are scenarios in which in one reducer multiple Actions have to be used.
 * Therefore it is important to always copy the entire state when returning and also to return a default state.
 * It also means that e.g. the Action identifiers (LOGIN, LOGOUT) are unique throughout the application.
 * (they may also reach the shoppingListReducer).
 * In order to keep them unique a technique called prefixing is recommended. The typical pattern is like:
 * export const LOGOUT = '[Auth] Logout'; (see auth.actions.ts).
 *
 * @param state
 * @param action
 */
export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions) {
  console.log(state);
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      /**
       * Important for initializing the state.
       */
      return state;
  }
}
