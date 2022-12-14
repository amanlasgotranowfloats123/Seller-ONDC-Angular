import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { StockComponent } from './stock/stock.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [

  {
    path:'',component:DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then(m => m.StockModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'support',
        loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
      },
      {
        path: 'addproduct/:id',
        loadChildren: () => import('./addproduct/addproduct.module').then(m => m.AddproductModule)
      },
      {
        path: 'ordersinner',
        loadChildren: () => import('./ordersinner/ordersinner.module').then(m => m.OrdersinnerModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
