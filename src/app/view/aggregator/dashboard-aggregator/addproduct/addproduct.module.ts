import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductRoutingModule } from './addproduct-routing.module';
import { AddproductComponent } from './addproduct.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddproductComponent],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  exports: [AddproductComponent],
})
export class AddproductModule {}
