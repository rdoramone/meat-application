import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { OrderItemsComponent } from './order-items/order-items.component';
import { OrderComponent } from './order.component';
import { DeliveryCostComponent } from './delivery-cost/delivery-cost.component';
import { SharedModule } from "./../shared/shared.module";

const ROUTES: Routes = [
  {
    path: '',
    component: OrderComponent
  }
]

@NgModule({
  declarations: [
    OrderComponent,
    OrderItemsComponent,
    DeliveryCostComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class OrderModule { }
