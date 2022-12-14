import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

export interface PeriodicElement {
  contactInfo: string;
  businessName: string;
  pinCode: string;
  orderValue: string;
  activationDate: string;
  status: string;
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  constructor(private apiService: ApiServiceService) {}
  dataSource: any[] = [];
  ngOnInit(): void {
    this.apiService.getSellerList().subscribe((response) => {
      console.log('response', response);
      this.dataSource = [...response.sellers];
    });
  }

  displayedColumns: string[] = [
    'check',
    'businessName',
    'contactInfo',
    'pinCode',
    // 'orderValue',
    'activationDate',
    'status',
  ];
}
