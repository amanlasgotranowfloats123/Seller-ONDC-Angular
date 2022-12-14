import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  category: string;
  product: string;
  value: string;
  amount: string;
  status: string;
  merchant: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    product: '#2354645634',
    category: '10 June 2022',
    value: '4',
    amount: '4000',
    status: 'Out for',
    merchant: 'Lion Trendy',
  },
  {
    product: '#2354645634',
    category: '10 June 2022',
    value: '4',
    amount: '4000',
    status: 'Out for',
    merchant: 'Ocean Cake',
  },
  {
    product: '#2354645634',
    category: '10 June 2022',
    value: '4',
    amount: '4000',
    status: 'Out for',
    merchant: 'ABC Quirks',
  },
  {
    product: '#2354645634',
    category: '10 June 2022',
    value: '4',
    amount: '4000',
    status: 'Out for',
    merchant: 'Best Harware',
  },
  {
    product: '#2354645634',
    category: '10 June 2022',
    value: '4',
    amount: '4000',
    status: 'Out for',
    merchant: 'Raju Store',
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'product',
    'category',
    'value',
    'amount',
    'status',
    'merchant',
  ];
  dataSource = ELEMENT_DATA;
}
