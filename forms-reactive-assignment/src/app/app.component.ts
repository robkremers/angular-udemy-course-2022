import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 *        Create a Form with the following Controls and Validators
 *        1) Project Name (should not be empty)
 *        2) Mail (should not be a empty and a valid email)
 *        3) Project Status Dropdown, with three values: 'Stable', 'Critical', 'Finished'
 *        4) Submit Button
 *
 *        Add your own Validator which doesn't allow "Test" as a Project Name
 *        Also implement that Validator as an async Validator (replace the other one)
 *        Upon submitting the form, simply print the value to the console
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forms-reactive-assignment';
  projectStatusWaarden: string[] = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectNames: string[] = ['Test'];

  projectForm: FormGroup;

  /**
   * Note that the synchronous and asynchronous Validators are a separate (array of) inputparamter(s).
   * See: https://angular.io/api/forms/FormControl
   */
  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(
        null,
        [Validators.required, this.syncForbiddenNames.bind(this)],
        this.asyncForbiddenNames
      ),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Critical')
    });
  }

  syncForbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  asyncForbiddenNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Testproject') {
          resolve({'async: invalidProjectName': true});
        } else {
          resolve(null);
        }
      }, 2000);
    })
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm);
  }
}
