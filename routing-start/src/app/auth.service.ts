import { Injectable } from '@angular/core';

/**
 * 147. Protecting Routes with canActivate.
 * 
 * Purpose:
 * - A fake service providing access functionality.
 * - In a real application this service might reach out to an authentication server.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor() { }

  login(): void {
    this.loggedIn = true;
  }

  logOut(): void {
    this.loggedIn = false;
  }

  /**
   * Purpose:
   * Simulation of the authentication process.
   * 
   * Background of promise:
   * - https://angular.io/guide/comparing-observables
   * 
   * Functionality:
   * - Will execute a method resolve after 800 msec.
   */
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout( () => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }
}
