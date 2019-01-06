import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './components/layout/base-layout/base-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout/login-layout.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { TopbarComponent } from './components/layout/topbar/topbar.component';
import { HomeComponent } from './components/modules/home/home.component';
import { LoginComponent } from './components/modules/login/login.component';
import { routing } from './app-routing';
import { AuthGuard } from './guards/auth-guard';
import { FooterComponent } from './components/layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    LoginLayoutComponent,
    MenuComponent,
    TopbarComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
