import { Component, OnInit } from '@angular/core';
import {AccountsService} from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'services-start';
  accounts: {name: string, status: string}[] = [];

  /**
   * 
   * @param accountsService Input parameter set up via Dependency Injection.
   */
  constructor(private accountsService: AccountsService) {
    
  }

  ngOnInit(): void {
      this.accounts = this.accountsService.accounts;
  }

}
