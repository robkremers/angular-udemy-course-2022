import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

/**
 * Injectable 
 * - tells Angular that the service can be injected or can receive injections.
 * - Is used at the place where you want to inject something.
 * - In newer versions of Angular it is recommended to always add Injectable.
 */
@Injectable(
  {
    providedIn: 'root'
  }
)
export class AccountsService {

  /**
   * In JS too an array is a reference type.
   */
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  statusUpdated = new EventEmitter<string>();

  constructor(
    private loggingService: LoggingService
  ) { }

  addAccount(name: string, status: string): void {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status + ' for the account with name ' + name);
  }

  updateStatus(id: number, status: string): void {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status + ' for the account with id ' + id);
  }

}
