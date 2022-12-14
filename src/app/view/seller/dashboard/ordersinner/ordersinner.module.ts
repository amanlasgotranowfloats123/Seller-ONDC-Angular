import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from '../orders/orders.component';
import { OrdersinnerComponent } from './ordersinner.component';
import { OrdersInnerRoutingModule } from './ordersinner-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [OrdersinnerComponent],
  imports: [
    CommonModule,
    OrdersInnerRoutingModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule
  ],
  exports:[OrdersinnerComponent]
})
export class OrdersinnerModule { }
