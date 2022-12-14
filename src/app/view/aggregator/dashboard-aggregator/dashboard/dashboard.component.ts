import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    // this.apiService.sellerListing().subscribe((res) => {
    //   console.log('res', res);
    // });
  }
}
