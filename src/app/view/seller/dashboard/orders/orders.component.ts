import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

export interface PeriodicElement {
  orderId: string;
  datetime: string;
  items: string;
  customer: string;
  amount: string;
  status: string;
}
interface StatusModel {
  value: string;
  viewValue: string;
  color: string;
  src: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    orderId: '#987544998098897',
    datetime: '22 Aug 2022',
    items: '4 items',
    customer: 'John Doe',
    amount: '₹1,200/-',
    status: 'Order Recieved',
  },
  {
    orderId: '#987544998098897',
    datetime: '22 Aug 2022',
    items: '4 items',
    customer: 'John Doe',
    amount: '₹1,200/-',
    status: 'Delivery Pending',
  },
  {
    orderId: '#987544998098897',
    datetime: '22 Aug 2022',
    items: '4 items',
    customer: 'John Doe',
    amount: '₹1,200/-',
    status: 'Out For Delivery',
  },
  {
    orderId: '#987544998098897',
    datetime: '22 Aug 2022',
    items: '4 items',
    customer: 'John Doe',
    amount: '₹1,200/-',
    status: 'Delivered',
  },
  {
    orderId: '#987544998098897',
    datetime: '22 Aug 2022',
    items: '4 items',
    customer: 'John Doe',
    amount: '₹1,200/-',
    status: 'Cancelled',
  },
  {
    orderId: '#987544998098897',
    datetime: '22 Aug 2022',
    items: '4 items',
    customer: 'John Doe',
    amount: '₹1,200/-',
    status: 'Cancelled ',
  },
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  num: number;

  statuses: StatusModel[] = [
    {
      value: 'pending',
      viewValue: 'Delivery pending',
      color: '#F38E03',
      src: 'assets/deliveryPending.svg',
    },
    {
      value: 'Canceled',
      viewValue: 'Canceled',
      color: '#F06460',
      src: 'assets/cancel.svg',
    },
    {
      value: 'recieved',
      viewValue: 'Order Recieved',
      color: '#098CD1',
      src: 'assets/orderReceived.svg',
    },
    {
      value: 'Delivered',
      viewValue: 'Delivered',
      color: '#739803',
      src: 'assets/orderCompleted.svg',
    },
    {
      value: 'Out For Delivery',
      viewValue: 'Out For Delivery',
      color: '#F38E03',
      src: 'assets/outForDelivery.svg',
    },
  ];

  constructor(private api: ApiServiceService) {
    this.num = ELEMENT_DATA.length;
  }

  ngOnInit(): void {
    this.api.getOrders().subscribe((data) => {
      console.log(data);
    });
  }

  displayedColumns: string[] = [
    'check',
    'orderId',
    'datetime',
    'items',
    'customer',
    'amount',
    'status',
  ];
  dataSource = ELEMENT_DATA;
}
