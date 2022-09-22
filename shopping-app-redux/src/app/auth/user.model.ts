/**
 * 300. Creating & Storing the User Data.
 * 
 * Resource:
 * - https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
 *  - The necessary parameters that will be used are described here.
 * 
 * Functionality to store user data, validation, storing the relevant token in order to check
 * that the connection is still valid.
 * 
 * When logging in a new token will be created.
 */

export class User {

    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            // In this case the token is not valid anymore.
            return null;
        }
        return this._token;
    }
}