// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app-routing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';

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
import { AlertComponent } from './components/modules/alert/alert.component';
import { AuthTokenInterceptor } from './auth-token-interceptor';
import { SeveritySelectorComponent } from './components/utils/severity-selector/severity-selector.component';
import { NodeSelectorComponent } from './components/utils/node-selector/node-selector.component';
import { NodeService } from './services/node.service';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { SeverityService } from './services/severity.service';
import { ThresholdService } from './services/threshold.service';
import { NodeComponent } from './components/modules/node/node.component';
import { UserComponent } from './components/modules/user/user.component';
import { ReportComponent } from './components/modules/report/report.component';
import { DatePipe } from '@angular/common';

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
    AlertComponent,
    SeveritySelectorComponent,
    NodeSelectorComponent,
    NodeComponent,
    UserComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthService,
    FrameService,
    NodeService,
    NotificationService,
    SeverityService,
    ThresholdService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
