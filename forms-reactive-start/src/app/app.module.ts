import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * 202. Introduction to the Reactive Approach.
 * For Reactive Forms the module ReactiveFormsModule needs to be imported instead of FormsModule.
 * 
 * 204. Reactive: Synching HTML and Form.
 * Background:
 * - https://angular.io/guide/reactive-forms
 * There are three steps to using form controls. 
 * - https://angular.io/api/forms/FormControl
 * 
 * By creating these controls in your component class, you get immediate access to listen for, update, and validate the state of the form input.
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
