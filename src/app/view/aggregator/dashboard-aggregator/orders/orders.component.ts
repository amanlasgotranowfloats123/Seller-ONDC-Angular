import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { SnackbarService } from 'src/app/shared/services/snackbar-service/snackbar.service';

export interface PeriodicElement {
  orderId: string;
  datetime: string;
  items: string;
  locations: string;
  seller: string;
  amount: string;
  status: string;
}

interface StatusModel {
  value: string;
  viewValue: string;
  color: string;
  src: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  statusOptions: StatusModel[] = [
    // {
    //   value: 'order recieved',
    //   viewValue: 'Order Recieved',
    //   color: '#098CD1',
    //   src: 'assets/orders/orderReceived.svg',
    // },
    {
      value: 'cancelled',
      viewValue: 'Cancelled',
      color: '#F06460',
      src: 'assets/cancel.svg',
    },
    {
      value: 'delivered',
      viewValue: 'Delivered',
      color: '#739803',
      src: 'assets/orderCompleted.svg',
    },
    {
      value: 'out for delivery',
      viewValue: 'Out For Delivery',
      color: '#F38E03',
      src: 'assets/outForDelivery.svg',
    },
    // {
    //   value: 'cancelled by customer',
    //   viewValue: 'Cancelled By Customer',
    //   color: '#F06460',
    //   src: 'assets/orders/cancelldbyCustomer.svg',
    // },
  ];
  isLoading = true;
  toggleModal: boolean = false;
  selectedOrderItem: any;
  constructor(
    private apiService: ApiServiceService,
    private snackBarService: SnackbarService
  ) {}
  dataSource: any[] = [];
  temp: any[] = [];
  ngOnInit(): void {
    this.apiService.getOrdersListFull().subscribe((response) => {
      this.dataSource = [...response.orders];
      this.temp = [...response.orders];
      this.isLoading = false;
    });
  }

  selectOrder(item: any): void {
    this.selectedOrderItem = item;
  }

  changeOrderStatus(status: string): void {
    this.selectedOrderItem.orderStatus = status;
  }

  updateOrder(): void {
    let $this = this;
    this.temp.find(
      (value) => value.id === $this.selectedOrderItem.id
    ).orderStatus = this.selectedOrderItem.orderStatus;
    this.dataSource = this.temp;
    this.apiService
      .updateOrder(this.selectedOrderItem.id, {
        orderStatus: this.selectedOrderItem.orderStatus,
      })
      .subscribe((res) => {
        console.log(res);
        this.snackBarService.openSnackBar(
          'order updated successfully',
          'close'
        );
      });
  }

  displayedColumns: string[] = [
    'check',
    'orderId',
    'datetime',
    'items',
    'locations',
    'seller',
    'amount',
    'status',
    'action',
  ];
}
