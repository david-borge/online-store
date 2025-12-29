import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './src/app/app.component';
import { config } from './src/app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(AppComponent, config, context);

export default bootstrap;
