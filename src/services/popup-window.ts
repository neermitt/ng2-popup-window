import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

export interface PopupUrl {
  url: string;
  hash: string;
  search: string;
  pathname: string;
}

export class PopupWindow {

  private _timer = Observable.interval(50);

  constructor(private window: Window) {
    this.onExit().do((x) => {
      console.log('Popup window closed.');
      this.window = null;
    }).subscribe();
  }

  public setFocus() {
    if (this.window && this.window.focus) {
      this.window.focus();
    }
  }

  public onExit(): Observable<string> {
    return this._timer.switchMap(() => {
      if (!this.window || this.window.closed) {
        return Observable.of('Windows closed');
      }
      return Observable.empty();
    }).take(1);
  }

  public onUrlChange(): Observable<PopupUrl> {
    return this._timer
      .switchMap(() => {
        const documentOrigin = document.location.host;
        let popupWindowOrigin = '';
        try {
          popupWindowOrigin = this.window.location.host;
        } catch (error) {
          // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
          // error instanceof DOMException && error.name === 'SecurityError'
        }
        if (popupWindowOrigin === documentOrigin) {

          return Observable.of({
            url: this.window.location.href,
            hash: this.window.location.hash,
            search: this.window.location.search,
            pathname: this.window.location.pathname
          });
        }
        return Observable.empty();
      }).take(1);
  }

  public close() {
    this.window.close();
    this.window = null;
  }
}
