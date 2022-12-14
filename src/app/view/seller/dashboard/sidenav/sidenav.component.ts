import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sideMenu:any=[
    {
      id:1,
      name:'Home',
      url:"/dashboard/home",
      src:"assets/icons/Union.svg",
      isActive:true

    },
    {
      id:2,
      name:'Stock',
      url:"/dashboard/stock",
      src:"assets/stockIcon.svg",
      isActive:false

    },
    {
      id:3,
      name:'Orders',
      url:"/dashboard/orders",
      src:"assets/ordersIcon.svg",
      isActive:false

    },
    {
      id:4,
      name:'Support',
      url:"/dashboard/support",
      src:"assets/Group 772543016.svg",
      isActive:false

    }
  ]

  activeClass(item:any){
    for(let i=0;i<this.sideMenu.length;i++){
if(this.sideMenu[i].id==item.id){
  this.sideMenu[i].isActive=true;
}else{
  this.sideMenu[i].isActive=false;
}
    }
  }
}
