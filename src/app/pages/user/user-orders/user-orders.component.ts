import { Component, OnInit } from '@angular/core';
import { IAdminOrder } from 'src/app/shared/interfaces/orderAdmin.interface';
import { AdminOrdersService } from 'src/app/shared/services/admin-orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  arrUserOrder: Array<IAdminOrder> = [];
  arrTotal: Array<any> = [];
  ordersStaus: boolean = false;
  totalPriceCount: any;
  constructor(private adminOrderService: AdminOrdersService) { }

  ngOnInit(): void {
    this.getUserOrder();
  }
  getUserOrder(): void {
    this.adminOrderService.getUserOrders().subscribe(data => {
      this.arrUserOrder = data;

    
      if (this.arrUserOrder.length > 0) {
        this.ordersStaus = true;
      }
      else {
        this.ordersStaus = false;
      }
    });
  
  }



}
