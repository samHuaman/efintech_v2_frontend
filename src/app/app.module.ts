import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';

// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";
import {CargaMasivaModule} from './views/carga-masiva/carga-masiva.module';
import {ClientesModule} from './views/clientes/clientes.module';
// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";

import {HttpRequestService} from './services/http-request.service';
import {BasicAuthGuard} from './auth/authguard-basic';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    CargaMasivaModule,
    RouterModule.forRoot(ROUTES),
    ClientesModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    BasicAuthGuard,
    HttpRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
