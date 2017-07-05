import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import * as qs from 'qs';

import {ObjectUtils} from '../../utils';
import {WindowService} from '../window.service';

import {PopupOptions} from './popup-options';

export interface Options {
  url?: string,
  popupOptions: PopupOptions,
  window_name: string
}

export interface PopupHandler {
  preload(options: Options): Window
  load (url: string, options: Options): Observable<any>
  close();
}

@Injectable()
export class DefaultPopupHandler implements PopupHandler {

  private _current_popup;

  constructor(private _windowService: WindowService) {
  }

  public preload(options: Options): Window {

    let _window = this._windowService.getWindow();
    let popupPosition = this.calculatePosition(options.popupOptions || {});
    let popupOptions = ObjectUtils.merge(popupPosition).with(options.popupOptions);
    let url = options.url || 'about:blank';
    let windowFeatures = qs.stringify(popupOptions, {
      encode: false,
      delimiter: ','
    });

    if (this._current_popup && !this._current_popup.closed) {
      return this._current_popup;
    }

    this._current_popup = _window.open(url, options.window_name, windowFeatures);

    this._current_popup.kill = () => {
      this.close();
    };

    return this._current_popup;
  }

  load(url: string, options: Options): Observable<any> {
    let _window = this._windowService.getWindow();

    let popupPosition = this.calculatePosition(options.popupOptions || {});
    let popupOptions = ObjectUtils.merge(popupPosition).with(options.popupOptions);

    let windowFeatures = qs.stringify(popupOptions, {
      encode: false,
      delimiter: ','
    });

    this._current_popup = _window.open(url, options.window_name, windowFeatures);

    this._current_popup.focus();

    return Observable.interval(50).switchMap(() => {
      if (!this._current_popup || this._current_popup.closed) {
        return Observable.throw(new Error('Popup Closed'));
      }
      let documentOrigin = document.location.host;
      let popupWindowOrigin = '';
      try {
        popupWindowOrigin = this._current_popup.location.host;
      } catch (error) {
        // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        //error instanceof DOMException && error.name === 'SecurityError'
      }

      if (popupWindowOrigin === documentOrigin) {
        const queryParams = this._current_popup.location.search.substring(1).replace(/\/$/, '');
        const hashParams = this._current_popup.location.hash.substring(1).replace(/[\/$]/, '');
        const hash = qs.parse(hashParams);
        const query = qs.parse(queryParams);
        const allParams = ObjectUtils.extend({}, query, hash);
        return Observable.of(allParams);
      }
      return Observable.empty();
    }).take(1);
  }

  public close() {
    this._current_popup.close();
    this._current_popup = null;
  }

  private calculatePosition(options: PopupOptions): PopupOptions {
    let width = options.width || 500;
    let height = options.height || 600;
    let _window = this._windowService.getWindow();

    let screenX = typeof _window.screenX !== 'undefined' ? _window.screenX : _window.screenLeft;
    let screenY = typeof _window.screenY !== 'undefined' ? _window.screenY : _window.screenTop;

    let outerWidth = typeof _window.outerWidth !== 'undefined'
      ? _window.outerWidth
      : _window.document.body.clientWidth;

    let outerHeight = typeof _window.outerHeight !== 'undefined'
      ? _window.outerHeight
      : _window.document.body.clientHeight;

    let left = (outerWidth - width) / 2;
    let top = (outerHeight - height) / 2;

    return {width: width, height: height, left: screenX + left, top: screenY + top};
  }


}
