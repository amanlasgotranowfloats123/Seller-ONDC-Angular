import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggregatorFormComponent } from './view/aggregator/aggregator-form/aggregator-form.component';
import { AggregatorLoginPageComponent } from './view/aggregator/aggregatorlogin-page/aggregatorlogin-page.component';
import { AuthGuard } from './auth/auth.guard';
import { GetOTPComponent } from './view/auth/get-otp/get-otp.component';
import { LoginPageComponent } from './view/auth/login-page/login-page.component';
import { SellarFormComponent } from './view/seller/sellar-form/sellar-form.component';

const routes: Routes = [
  // protected routes
  { path: '', component: GetOTPComponent, pathMatch: 'full' },
  {
    path: 'seller-form',
    component: SellarFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./view/seller/dashboard/dashboard.module').then((mod) => mod.DashboardModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'aggregator-form',
    component: AggregatorFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'aggregator-dashboard',
    loadChildren: () =>
      import('./view/aggregator/dashboard-aggregator/dashboard-aggregator.module').then(
        (mod) => mod.DashboardModule
      ),
  },

  // unprotected routes
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AggregatorLoginPageComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
