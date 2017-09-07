import {Routes} from "@angular/router";

import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import {StarterViewComponent} from "./views/appviews/starterview.component";
import {LoginComponent} from "./views/appviews/login.component";

import {CargaMasivaDetalleComponent} from './views/carga-masiva/carga-masiva-detalle.component';
import {SolicitudesComponent} from './views/solicitudes/solicitud.component';
import {ClienteDetalleComponent} from './views/clientes/cliente-detalle.component';
import { CuentaDetalleComponent } from './views/clientes/cuenta-detalle.component';
import { BusquedaComponent } from './views/clientes/busqueda.component';
import { MovimientoComponent } from './views/clientes/movimiento.component';

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import {TopNavigationLayoutComponent} from "./components/common/layouts/topNavigationlayout.component";

import {BasicAuthGuard} from './auth/authguard-basic';

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'starterview', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      {path: 'dashboard3', component: Dashboard3Component},
      {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component}
    ]
  },
  {
    path: 'dashboards', component: TopNavigationLayoutComponent,
    children: [
      {path: 'dashboard41', component: Dashboard41Component}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'starterview', component: StarterViewComponent, canActivate: [BasicAuthGuard]}
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'carga-masiva', component: BasicLayoutComponent,
    children: [
      { path: '', component: CargaMasivaDetalleComponent }
    ]
  },
  {
    path: 'solicitudes', component: BasicLayoutComponent,
    children: [
      { path: '', component: SolicitudesComponent }
    ]
  },
  {
    path: 'cliente', component: BasicLayoutComponent,
    children: [
      {path: 'busqueda',  component: BusquedaComponent},
      {path: 'cliente-detalle/:personaId',  component: ClienteDetalleComponent},
      {path: 'cuenta-detalle/:cuentaId/:personaId',  component: CuentaDetalleComponent},
      {path: 'movimiento/:cuentaId/:personaId',  component: MovimientoComponent}
    ]
  },

  // Handle all other routes
  {path: '**',  redirectTo: 'starterview'}
];
