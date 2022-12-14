import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersinnerComponent } from './ordersinner.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersinnerComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersInnerRoutingModule { }
