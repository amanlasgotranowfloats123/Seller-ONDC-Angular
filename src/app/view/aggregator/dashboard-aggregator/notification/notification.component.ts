import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  dateTime: string;
  notificationId: string;
  sendTo: string;
  description: string;
  cta: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {notificationId: '#65857579575756', dateTime: '22 Aug 2022', sendTo: 'Ocean Cakes', description: 'Please update back image fo..',cta:'--'},
  {notificationId: '#65857579575756', dateTime: '22 Aug 2022', sendTo: 'Ocean Cakes', description: 'Please update back image fo..',cta:'Youtube Link'},
  {notificationId: '#65857579575756', dateTime: '22 Aug 2022', sendTo: 'Ocean Cakes', description: 'Please update back image fo..',cta:'--'},
  {notificationId: '#65857579575756', dateTime: '22 Aug 2022', sendTo: 'Ocean Cakes', description: 'Please update back image fo..',cta:'--'},
  {notificationId: '#65857579575756', dateTime: '22 Aug 2022', sendTo: 'Ocean Cakes', description: 'Please update back image fo..',cta:'Youtube Link'},
  {notificationId: '#65857579575756', dateTime: '22 Aug 2022', sendTo: 'Ocean Cakes', description: 'Please update back image fo..',cta:'--'},



];

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['check','notificationId', 'dateTime', 'sendTo', 'description','cta','action'];
  dataSource = ELEMENT_DATA;
}
