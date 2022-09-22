import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
