import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {Chart, registerables} from 'chart.js';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {appConfig} from './app/app.config';

Chart.register(...registerables);
registerLocaleData(localePt);

bootstrapApplication(AppComponent, appConfig).catch((error) => console.error(error));
