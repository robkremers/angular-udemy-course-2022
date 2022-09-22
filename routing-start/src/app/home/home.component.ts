import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLoadServers() {
    // Here some complex calculation is implemented which prevents us to simply use 'routerLink' directive.

    // Now we need access to our router. We can access the router via Dependency Injection.
    // 131. Navigating Programmatically.
    // With this functionality we can navigate from the Home-page to the Servers page.
    // Note that this is the situation where the source- and target-pages are different.

    /**
     * Now we need access to our router. We can access the router via Dependency Injection.
     * 131. Navigating Programmatically.
     * With this functionality we can navigate from the Home-page to the Servers page.
     * Note that this is the situation where the source- and target-pages are different.
     * 
     * We have two possible implementations here to be added to the array:
     * - absolute path: '/servers'
     *  - Angular will set this path on the root: localhost:4206/ (which is the same as the current path for the Home page).
     * - relative path: 'servers'
     *  - Angular will set this path relative to the current path: localhost:4206/.
     *    Since this happens to be a correct path the relative path will be successful too.
     *    - Again: Note that this is the situation where the source- and target-pages are different.
     *      Now this works!
     */
    this.router.navigate(['servers']);
  }

  /**
   * 
   * @param id Input parameter: intended for server.id.
   */
  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logOut();
  }

}
