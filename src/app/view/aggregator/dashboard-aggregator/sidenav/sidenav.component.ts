import { Component, OnInit } from '@angular/core';
import { ENUMS } from 'src/utils/enums';
import { getLocalItem } from 'src/utils/localstorage';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  companyLogo: any = null;
  constructor() {}

  ngOnInit(): void {
    let data: any[] = getLocalItem(ENUMS.SITEINFO);
    console.log('SITEINFO-->', data);
    this.companyLogo = data[0]?.logo;
  }

  sideMenu: any = [
    {
      id: 1,
      name: 'Home',
      url: '/aggregator-dashboard/home',
      src: 'assets/icons/Union.svg',
      isActive: true,
    },
    {
      id: 2,
      name: 'Manage Sellers',
      url: '/aggregator-dashboard/manage-seller',
      src: 'assets/managesellers.svg',
      isActive: false,
    },
    {
      id: 3,
      name: 'Reports',
      url: '/aggregator-dashboard/reports',
      src: 'assets/reports.svg',
      isActive: false,
    },
    {
      id: 4,
      name: 'Orders',
      url: '/aggregator-dashboard/orders',
      src: 'assets/ordersIcon.svg',
      isActive: false,
    },
    {
      id: 5,
      name: 'Support',
      url: '/aggregator-dashboard/support',
      src: 'assets/Group 772543016.svg',
      isActive: false,
    },
    {
      id: 6,
      name: 'Notification Center',
      url: '/aggregator-dashboard/notification',
      src: 'assets/notifaction.svg',
      isActive: false,
    },
  ];

  activeClass(item: any) {
    for (let i = 0; i < this.sideMenu.length; i++) {
      if (this.sideMenu[i].id == item.id) {
        this.sideMenu[i].isActive = true;
      } else {
        this.sideMenu[i].isActive = false;
      }
    }
  }
}
