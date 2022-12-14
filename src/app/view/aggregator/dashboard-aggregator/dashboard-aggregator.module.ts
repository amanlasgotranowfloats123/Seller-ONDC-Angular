import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbaarComponent } from './toolbaar/toolbaar.component';
import { MatCardModule } from '@angular/material/card';
import { DashboardRoutingModule } from './dashboard-aggregator-routing.module';

@NgModule({
  declarations: [DashboardComponent, SidenavComponent, ToolbaarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    HomeModule,
    MatToolbarModule,
    MatCardModule,
  ],
})
export class DashboardModule {}
