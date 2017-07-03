import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Ng2PopupWindowModule} from '../../src';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2PopupWindowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
