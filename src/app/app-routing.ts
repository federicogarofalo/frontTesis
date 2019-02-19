import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth-guard';
import {BaseLayoutComponent} from './components/layout/base-layout/base-layout.component';
import {LoginLayoutComponent} from './components/layout/login-layout/login-layout.component';
import {HomeComponent} from './components/modules/home/home.component';
import {LoginComponent} from './components/modules/login/login.component';
import {AlertsComponent} from './components/modules/alerts/alerts.component';
import {ThresholdsConfigComponent} from './components/modules/configuration/thresholds-config/thresholds-config.component';
import {NodesConfigComponent} from './components/modules/configuration/nodes-config/nodes-config.component';
import {AlertsConfigComponent} from './components/modules/configuration/alerts-config/alerts-config.component';
import {NodeComponent} from './components/modules/node/node.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      }, {
        path: 'alertas',
        component: AlertsComponent
      }, {
        path: 'nodos',
        component: NodeComponent
      }, {
        path: 'configuracion/umbrales',
        component: ThresholdsConfigComponent
      }, {
        path: 'configuracion/nodos',
        component: NodesConfigComponent
      }, {
        path: 'configuracion/alertas',
        component: AlertsConfigComponent
      }
    ]
  }, {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
