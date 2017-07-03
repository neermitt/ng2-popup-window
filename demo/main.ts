import 'zone.js'; // Included with Angular CLI.
import 'reflect-metadata'; // Included with Angular CLI.
import '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

platformBrowserDynamic().bootstrapModule(AppModule);

