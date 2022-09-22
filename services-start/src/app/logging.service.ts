import { Injectable } from '@angular/core';

/**
 * @Injectable 
 * - tells Angular that the service can be injected or can receive injections.
 * - Is used at the place where you want to inject something.
 *  - So according to this here Injectable can be put on comment.
 * - In newer versions of Angular it is recommended to always add Injectable.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
