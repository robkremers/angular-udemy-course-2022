import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import { LoggingService } from './logging.service';
import {Store} from "@ngrx/store";

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';


/**
 * 305. Adding Auto-login.
 * Added AuthService.autoLogin().
 * This will ensure that once logged in or signup we remain logged even if the web page is reloaded.
 *
 * 402. Adding Angular Universal.
 * PLATFORM_ID is an Angular property telling on which platform the application resides.
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
    private loggingService: LoggingService,
    @Inject(PLATFORM_ID) private platformId
    ) {}

  /**
   * 402. Adding Angular Universal.
   * The AutoLogin is only to be active if it runs on a browser and not on a server.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch( new AuthActions.AutoLogin());
    }
    this.loggingService.printlog('Hello from AppComponent ngOnInit');
  }

}
