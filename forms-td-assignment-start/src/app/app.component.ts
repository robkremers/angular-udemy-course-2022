import { Component, ViewChild } from '@angular/core';
// This is necessary for the html even if it is not being used in this class at the moment.
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms-td-assignment-start';

  @ViewChild('form') signupForm: NgForm;

  defaultMailAddress: string = 'default@mail.com';
  
  subscriptions: string[] = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription: string = 'Advanced';

  defaultPassword: string = 'password123';

  submitted: boolean = false;

  input = {
    email: '',
    subscription: '',
    password: ''
  };

  onSubmit() {
    console.log(this.signupForm);

    this.input.email = this.signupForm.value.email;
    this.input.subscription = this.signupForm.value.subscription;
    this.input.password = this.signupForm.value.password;
    this.submitted = true;

    // this.signupForm.reset();
  }
}
