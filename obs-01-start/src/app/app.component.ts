import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'obs-01-start';
  userActivated: boolean = false;
  subscription: Subscription;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService.activatededEmitter.subscribe(
      didActivated => {
        this.userActivated = didActivated;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
