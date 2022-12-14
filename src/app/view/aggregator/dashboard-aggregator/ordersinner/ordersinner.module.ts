import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from '../orders/orders.component';
import { OrdersinnerComponent } from './ordersinner.component';
import { OrdersInnerRoutingModule } from './ordersinner-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OrdersinnerComponent],
  imports: [
    CommonModule,
    OrdersInnerRoutingModule,
    MatSelectModule,
    MatIconModule,
  ],
  exports: [OrdersinnerComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersinnerModule {}
