import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [NotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    MatTableModule,
    MatButtonModule
  ],
  exports:[
    NotificationComponent
  ]
})
export class NotificationModule { }
