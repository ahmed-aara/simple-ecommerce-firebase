import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/auth/login/login.component';
import { RegisterComponent } from './page/auth/register/register.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { CartComponent } from './page/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    DashboardComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers: [
    ScreenTrackingService, UserTrackingService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
