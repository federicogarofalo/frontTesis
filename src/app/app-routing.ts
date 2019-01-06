import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth-guard';
import {BaseLayoutComponent} from './components/layout/base-layout/base-layout.component';
import {LoginLayoutComponent} from './components/layout/login-layout/login-layout.component';
import {HomeComponent} from './components/modules/home/home.component';
import {LoginComponent} from './components/modules/login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
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
