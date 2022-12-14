import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './view/auth/login-page/login-page.component';
import { SellarFormComponent } from './view/seller/sellar-form/sellar-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AggregatorLoginPageComponent } from './view/aggregator/aggregatorlogin-page/aggregatorlogin-page.component';
import { AggregatorFormComponent } from './view/aggregator/aggregator-form/aggregator-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { GetOTPComponent } from './view/auth/get-otp/get-otp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './ngrx/states/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './ngrx/states/auth/auth.effects';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AggregatorOrderEffects } from './ngrx/states/orders-agg/orders.effects';
import { getOrderListAggregator } from './ngrx/states/orders-agg/orders.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const REDUCERS = {
  auth: authReducer,
  ordersAgg: getOrderListAggregator,
};

const EFFECTS = [AuthEffects, AggregatorOrderEffects];

const UI_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatRadioModule,
  MatExpansionModule,
  MatSliderModule,
  NgbModule,
  BrowserAnimationsModule,
  MatSnackBarModule,
  NgbModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SellarFormComponent,
    AggregatorLoginPageComponent,
    AggregatorFormComponent,
    GetOTPComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UI_MODULES,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(REDUCERS),
    EffectsModule.forRoot(EFFECTS),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
