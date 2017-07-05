import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DefaultPopupHandler, WindowService} from './services';

const POPUP_WINDOW_COMPONENTS = [];

const POPUP_WINDOW_DIRECTIVES = [];

const POPUP_WINDOW_PIPES = [];

const POPUP_WINDOW_SERVICES = [WindowService, DefaultPopupHandler];

const POPUP_WINDOW_VALIDATORS = [];

@NgModule({
  declarations: [
    ...POPUP_WINDOW_PIPES,
    ...POPUP_WINDOW_DIRECTIVES,
    ...POPUP_WINDOW_COMPONENTS
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...POPUP_WINDOW_PIPES,
    ...POPUP_WINDOW_DIRECTIVES,
    ...POPUP_WINDOW_COMPONENTS
  ],
  providers: [
    ...POPUP_WINDOW_VALIDATORS,
    ...POPUP_WINDOW_SERVICES
  ]
})
export class Ng2PopupWindowModule {
}
