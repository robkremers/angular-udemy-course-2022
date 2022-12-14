import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

/**
 * 276. Multiple Interceptors.
 * The order in which Interceptors are provided in app.module.ts is important because that is the order in which they will be executed.
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true 
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: LoggingInterceptorService, 
      multi: true 
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
