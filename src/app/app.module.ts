// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app-routing';
import { HttpClientModule} from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './components/layout/base-layout/base-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout/login-layout.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { TopbarComponent } from './components/layout/topbar/topbar.component';
import { HomeComponent } from './components/modules/home/home.component';
import { LoginComponent } from './components/modules/login/login.component';
import { FooterComponent } from './components/layout/footer/footer.component';

// Services
import { AuthGuard } from './guards/auth-guard';
import { FrameService } from './services/frame.service';
import { NodesConfigComponent } from './components/modules/configuration/nodes-config/nodes-config.component';
import { AlertsConfigComponent } from './components/modules/configuration/alerts-config/alerts-config.component';
import { ThresholdsConfigComponent } from './components/modules/configuration/thresholds-config/thresholds-config.component';
import { AlertsComponent } from './components/modules/alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    LoginLayoutComponent,
    MenuComponent,
    TopbarComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    NodesConfigComponent,
    AlertsConfigComponent,
    ThresholdsConfigComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    FrameService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
