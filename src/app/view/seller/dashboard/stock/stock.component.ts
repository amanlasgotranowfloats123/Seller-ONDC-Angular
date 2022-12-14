import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

export interface PeriodicElement {
  category: string;
  product: string;
  sellingPrice: string;
  stockQty: string;
}



@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  data: any;
  sellerId: any;
  num: any;

  constructor(private api: ApiServiceService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((Data: any) => {
      this.data = Data.products;
      this.num = this.data.length;

      this.dataSource = new MatTableDataSource(this.data);
    });
  }

  displayedColumns: string[] = [
    'check',
    'name',
    'category',
    'sellingPrice',
    'stockQuantity',
    'action',
  ];

  deleteProd(del: any) {
    this.sellerId = localStorage.getItem('sellerId');
    this.api.deleteProduct(del, this.sellerId).subscribe((get: any) => {
      this.ngOnInit();
    });
  }
}
