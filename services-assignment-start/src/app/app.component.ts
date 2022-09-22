import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'services-assignment-start';
  activeUsers: string[] = [];
  inactiveUsers: string[] = [];

  /**
   * @param UsersService Input parameter set up via Dependency Injection.
   */
  constructor(private usersService: UsersService) {
  }
  ngOnInit(): void {
    this.activeUsers = this.usersService.activeUsers;
    this.inactiveUsers = this.usersService.inactiveUsers;
  }
}
