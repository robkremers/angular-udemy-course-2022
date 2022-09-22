import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
// import {ModuleMapLoaderModule} from "@nguniversal/module-map-ngfactory-loader";

/**
 * 401. Angular Universal & ModuleMapLoader.
 * Per Angular 9 the ModuleMapLoader is no longer necessary.
 *
 * 402. Adding Angular Universal.
 * Adding ModuleMapLoaderModule enables lazy loading when using @nguniversal
 *
 */
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    // ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
