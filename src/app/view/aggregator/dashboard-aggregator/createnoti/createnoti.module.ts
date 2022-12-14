import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotiRoutingModule } from './createnoti-routing.module';
import { CreatenotiComponent } from './createnoti.component';



@NgModule({
  declarations: [CreatenotiComponent],
  imports: [
    CommonModule,
    CreateNotiRoutingModule
  ],
  exports:[
    CreatenotiComponent
  ]
})
export class CreatenotiModule { }
