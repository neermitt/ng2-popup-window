import {Injectable} from '@angular/core';
import {PopupOptions} from './popup-options';
import {PopupWindow} from './popup-window';

@Injectable()
export class PopupWindowService {

  private static prepareOptions(options: PopupOptions) {
    options = options || {};
    const width = options.width || 500;
    const height = options.height || 500;
    return Object.assign(
      {
        width,
        height,
        left: window.screenX + ((window.outerWidth - width) / 2),
        top: window.screenY + ((window.outerHeight - height) / 2.5)
      },
      options);
  }

  private static stringifyOptions(options: any) {
    return Object.keys(options).map((key) => {
      return key + '=' + options[key];
    }).join(',');
  }

  public open(url: string, name: string, options: PopupOptions): PopupWindow {
    const stringifiedOptions =
      PopupWindowService.stringifyOptions(PopupWindowService.prepareOptions(options));

    const UA = window.navigator.userAgent;
    const windowName = UA.indexOf('CriOS') > -1 ? '_blank' : name;

    const popupWindow = new PopupWindow(window.open(url, windowName, stringifiedOptions));
    popupWindow.setFocus();
    return popupWindow;
  }

}
