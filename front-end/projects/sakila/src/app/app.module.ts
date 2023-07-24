import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JmaCoreModule } from 'jma-core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, JmaCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
