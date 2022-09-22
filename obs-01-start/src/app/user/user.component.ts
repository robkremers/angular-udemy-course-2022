import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(    
    private route: ActivatedRoute,
    private  userService: UserService) {
  }

  /**
   * this.route.params is an Observable.
   * In this case an explicit unsubscribe is not necessary because, coming from this.route.params,
   * i.e. provided by Angular, Angular will do this for you.
   * If an Observable is provided by an Angular package Angular will also provide the unsubscribe().
   * 
   */
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
      });
  }

  onActivate() {
    // this.userService.activatededEmitter.emit(true);

    /**
     * .next() is used because Subject() is a special kind of observable.
     */
    this.userService.activatededEmitter.next(true);
  }



}
