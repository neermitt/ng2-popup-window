import {Component} from '@angular/core';
import {PopupUrl, PopupWindow, PopupWindowService} from '../../src/services';

@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {
  title = 'app';
  popup: PopupWindow;

  constructor(private popupService: PopupWindowService) {

  }

  open() {
    this.popup = this.popupService.open("http://localhost:8000/", "test", {
      width: 400,
      height: 400
    });

    this.popup.onUrlChange().do((x: PopupUrl) => {
      console.log("Window loaded " + x.url);
    }).subscribe();
  }

  close() {
    this.popup.close();
  }
}
