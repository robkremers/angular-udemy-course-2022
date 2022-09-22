import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';


@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent
  ],
  /**
   * 324. Splitting Modules Correctly.
   * The BrowserModule can only be imported once. 
   * This is a special module because it also has some startup features.
   * In all other modules use the CommonModule.
   * 
   * 330. Adding an Auth Feature Module.
   * 332. Implementing Lazy Loading.
   * Once Lazy Loading is installed the RecipesModule should not be imported anymore in app.module.ts.
   * If this is forgotten the application will not work properly anymore.
   * 
   */
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AuthModule, // Is Lazyloaded.
    // RecipesModule, // Is Lazyloaded.
    // ShoppingListModule, // Is Lazyloaded.
    SharedModule,
    CoreModule,
    /**
     * AppRoutingModule should always be added at the end of the imports in order
     * to prevent import inconsistencies.
     */
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule { }
