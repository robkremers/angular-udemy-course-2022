import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging.service';
import {Store} from "@ngrx/store";

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';


/**
 * 305. Adding Auto-login.
 * Added AuthService.autoLogin().
 * This will ensure that once logged in or signup we remain logged even if the web page is reloaded.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopping-app';

  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
    ) {}

  ngOnInit(): void {
    this.store.dispatch( new AuthActions.AutoLogin());
    this.loggingService.printlog('Hello from AppComponent ngOnInit');
  }

}
