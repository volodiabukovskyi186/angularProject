import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from 'src/app/shared/services/admin-orders.service';
import { IAdminOrder } from 'src/app/shared/interfaces/orderAdmin.interface';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  arrAdminOrders: Array<IAdminOrder> = [];
  constructor(private orderAdminService: AdminOrdersService) { }

  ngOnInit(): void {
    this.getAdminOrders();
  }


  getAdminOrders(): void {
    this.orderAdminService.getOrders().subscribe(data => {
      this.arrAdminOrders = data;
      console.log(this.arrAdminOrders)
    })
    
  }
  deleteOrder(order:any):void{
  
    console.log(order)
    this.orderAdminService.deleteOrders(order).subscribe(()=>{
      this.getAdminOrders()
    })
  }

}
