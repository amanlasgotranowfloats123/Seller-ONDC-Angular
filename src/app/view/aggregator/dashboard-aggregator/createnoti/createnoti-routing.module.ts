import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatenotiComponent } from './createnoti.component';

const routes: Routes = [
  {
    path: '',
    component: CreatenotiComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNotiRoutingModule { }
