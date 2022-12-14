import { Component, OnInit } from '@angular/core';

interface StatusModel {
  value: string;
  viewValue: string;
  color: string;
}
interface ItemList {
  name: string;
  stock: string;
  qty: string;
  price: string;
  img: string;
}

@Component({
  selector: 'app-ordersinner',
  templateUrl: './ordersinner.component.html',
  styleUrls: ['./ordersinner.component.scss']
})
export class OrdersinnerComponent implements OnInit {
  statuses: StatusModel[] = [
    { value: 'pending', viewValue: 'Delivery pending', color: '#F38E03' },
    { value: 'initiated', viewValue: 'Delivery initiated', color: '#8B8000' },
    { value: 'done', viewValue: 'Delivery done', color: 'green' },
  ];

  items: ItemList[] = [
    {
      name: 'USB Cable ',
      stock: '400 pieces available',
      qty: '1',
      price: '₹5,000',
      img: 'https://picsum.photos/200/300',
    },
    {
      name: 'USB Cable ',
      stock: '400 pieces available',
      qty: '1',
      price: '₹5,000',
      img: 'https://picsum.photos/200/300',
    },
    {
      name: 'USB Cable ',
      stock: '400 pieces available',
      qty: '1',
      price: '₹5,000',
      img: 'https://picsum.photos/200/300',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
