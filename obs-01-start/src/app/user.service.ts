import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // activatededEmitter = new EventEmitter<boolean>();

  activatededEmitter = new Subject<boolean>();

  constructor() { }
}
