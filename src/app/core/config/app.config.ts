import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

import { routes } from '../../app.routes';

registerLocaleData(localeHu);

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes), provideHttpClient()],
};
