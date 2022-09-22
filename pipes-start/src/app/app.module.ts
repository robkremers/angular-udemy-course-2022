import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExponentialStrengthPipe } from './pipes/exponential-strength.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ReverseStringPipe } from './pipes/reverse-string.pipe';
import { SortListPipe } from './pipes/sort-list.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ExponentialStrengthPipe,
    ShortenPipe,
    FilterPipe,
    ReverseStringPipe,
    SortListPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
