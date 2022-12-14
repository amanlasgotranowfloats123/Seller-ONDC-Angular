import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

export interface ProductModel {
  category: string;
  product: string;
  value: string;
  amount: string;
  status: string;
  merchant: string;
}

export interface OrderModel {
  orderid: string;
  createdAt: string;
  item: string;
  total: string;
  orderStatus: string;
  merchant: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ProductData: any[] = [];
  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.getOrdersListAggregator('1').subscribe((res) => {
      if (res.status === 'success') {
        res.orders.map((el) => {
          let payload = {
            orderId: el.id,
            createdAt: el.createdAt,
            items: el.items.length,
            total: el.orderSummary.total,
            status: el.orderStatus,
            merchant: el.sellerId,
          };

          this.ProductData.push(payload);
        });
      }
    });
    console.log(this.ProductData);
    // this.apiService.getAllProductsAggregator().subscribe((res) => {
    //   if (res.status) {
    //     console.log(res.products);
    //   }
    // });
  }

  displayedColumns: string[] = [
    'orderid',
    'createdAt',
    'app',
    'items',
    'amount',
    'status',
    'merchant',
  ];
}
