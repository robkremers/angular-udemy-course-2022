import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms-td-start';
  @ViewChild('form') signupForm: NgForm;
  defaultQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['male', 'female'];
  defaultGender: string = 'male';
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted: boolean = false;

  /**
   * 199. TD: Setting and Patching Form Values.
   * One approach: this.signupForm.setValue()
   * - all fields need to receive an a value. Otherwise an error will occur.
   * - now all fields will receive a suggested value.
   * - Disadvantage: it would override already existing values.
   * Other approach: this.signupFrom.form.patchValue()
   * - now only specific fields can be given a value.
   * - no error will occur if the other fields remain empty.
   * 
   */
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  /**
   * 188. TD: Submitting and Using the Form.
   * 
   * By sending 'form' to the console now a lot of information is visible.
   * - Among them:
   *  
   * 
   * @param form: NgForm: An element in the DOM; it allows access to and in some cases modification 
   *              of aspects of the form, as well as access to its component elements
   *              This is what has been accessed in app.component.html:
   *              - (ngSubmit)="onSubmit(form)" #form="ngForm"
   * 
   */
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  /**
   * 200. TD: Using Form Data.
   * 
   * This.signupFrom.value.<name of the element>!!!
   * Thus the name of the property in this class may be different in the html page.
   * So this could be a reason to equalize the values of these properties.
   * 
   * 201. TD: Resetting Forms.
   * 
   * this.signupForm.reset();
   * When looking in Developer Tool | Elements the properties will now
   * show class = 'ng-untouched ng-pristine ng-invalid' (depending on the element).
   * It's like the page has been reloaded.
   * 
   */
  onSubmit() {
    console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secretQuestion;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }

}
