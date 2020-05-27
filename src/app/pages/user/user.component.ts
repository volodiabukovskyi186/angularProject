import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from 'src/app/shared/services/admin-orders.service';
import { IAdminOrder } from 'src/app/shared/interfaces/orderAdmin.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

 
  constructor(private adminOrderService: AdminOrdersService) { }

  ngOnInit(): void {
   
  }
 


}
