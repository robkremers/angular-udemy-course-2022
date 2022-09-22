import { Injectable } from '@angular/core';

/**
 * 336. Loading Services Differently.
 * 
 * Creation of a dummy service: LoggingService.
 * The @Injectable below ensures that the service is available throughout the application.
 * 
 */
// @Injectable({
//   providedIn: 'root'
// })
export class LoggingService {
  private lastlog: string;

  constructor() { }

  printlog(message: string): void {
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
  }
}
