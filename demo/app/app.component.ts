import {Component} from '@angular/core';
import 'rxjs/add/operator/do';

import {DefaultPopupHandler} from '../../src/services';

@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private popupService: DefaultPopupHandler) {

  }

  open() {
    this.popupService.load("http://localhost:8000/?test=mine", {
      url: 'http://localhost:8000/',
      window_name: 'test',
      popupOptions: {
        width: 400,
        height: 400
      }
    }).subscribe(
      data => {
        console.log(data)
      }, error => {
        console.log('on Error %s', error);
      });
  }

  close() {
    this.popupService.close();
  }

  preload() {
    this.popupService.preload({
      window_name: 'test',
      popupOptions: {
        width: 400,
        height: 400
      }
    });
  }
}
