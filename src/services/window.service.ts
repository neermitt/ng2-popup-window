import {Injectable} from '@angular/core';

@Injectable()
export class WindowService {

  getDocument(): Document {
    return window.document;
  }

  getWindow() {
    return window;
  }
}
