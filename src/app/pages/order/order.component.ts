import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { IAdminOrder } from 'src/app/shared/interfaces/orderAdmin.interface';
import { AdminOrder } from 'src/app/shared/model/orderAdmin.model';
import { AdminOrdersService } from 'src/app/shared/services/admin-orders.service';
import { FormGroup, FormControl, Validators, NgForm, } from '@angular/forms';

import { Router, NavigationEnd, Event } from '@angular/router';
import { IOrderUser } from 'src/app/shared/interfaces/orderUser.interface';
import { UserInformationService } from 'src/app/shared/services/user-information.service';
import { IUserInformation } from 'src/app/shared/interfaces/userInformation.interface';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  public sing = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{3,}')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8,13}')]),
    city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{4,}')]),
    street: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]),
    house: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,4}')])


  })
  arrOrders: Array<IOrder> = [];

  orderBlockStatus: boolean = false;
  totalPrice: number;
  arrDataOrder: Array<IAdminOrder> = [];
  orderStatus: boolean = false;
  orderName: string;
  orderPhone: string;
  orderCity: string;
  orderStreet: string;
  orderHouse: string;
  userID: IOrderUser = { id: 'guest', email: 'guest' };
  userInform: Array<IUserInformation>;
  arrallUsers: Array<IUserInformation>;
  userCheckData: any;


  userDataStatus: boolean = false;

  constructor(private orderService: OrderService,
    private adminOrderService: AdminOrdersService,
    private userInfService: UserInformationService,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem('user')) {
          this.getUserIngorm();

        }
      }
    })

  }

  ngOnInit(): void {
    this.getOrderAdmin()
    this.getOrder();
    this.checkStatus();
    this.getAllUser();
   

  }

  getOrderAdmin(): void {
    // if (localStorage.getItem('user')) {
      this.adminOrderService.getOrders().subscribe(data => {
        this.arrDataOrder = data;
       
        // this.orderName=this.arrDataOrder[0].userName;
      });
    // }

  }
  getAllUser(): void {
   
    if (localStorage.getItem('user')) {
      let localuser = JSON.parse(localStorage.getItem('user'))


      this.userInfService.getAllUserData().subscribe(data => {
        this.arrallUsers = data;

        this.userCheckData = this.arrallUsers.find(elem => elem.userId == localuser.id)
       
        if (this.userCheckData == undefined) {
          this.userDataStatus = false;
        }
        else {

          this.getOrderAdmin();
          this.userDataStatus = true;
          this.orderName = this.userCheckData.name
          this.orderPhone = this.userCheckData.phone
          this.orderCity = this.userCheckData.city
          this.orderStreet = this.userCheckData.street
          this.orderHouse = this.userCheckData.house


        }
      })
    }
    else{
      this.userDataStatus = false;
    }
  }
  getUserIngorm(): void {
    let userLocal = JSON.parse(localStorage.getItem('user'))
    this.userInfService.getUserData(userLocal.id).subscribe(data => {
      this.userInform = data;
     

    })
  }
  private getOrder(): void {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.arrOrders = JSON.parse(localStorage.getItem('products'));
    }
    if (this.arrOrders.length > 1) {
      this.orderBlockStatus = true;

    } else if (this.arrOrders.length == 1) {
      this.orderBlockStatus = false;
    }
    this.orderService.bag.next(this.arrOrders);
    this.total();
  }

  deleteOrder(product): void {
    const index = this.arrOrders.findIndex(prod => prod.id === product.id)
    this.arrOrders.splice(index, 1);
    this.total();
    this.updateLocalstorage()
    this.orderService.bag.next(this.arrOrders);
    this.checkStatus()
  }




  // send order to admin-orders component =>
  submitBuy(): void {
    
    if (localStorage.getItem('user')) {
      let getUser = JSON.parse(localStorage.getItem('user'))

      this.userID = { id: getUser.id, email: getUser.userName }

    }

    const adminOrders: IAdminOrder = new AdminOrder(1,
      Math.round(this.totalPrice),
      this.orderName,
      this.orderPhone,
      this.orderCity,
      this.orderStreet,
      this.orderHouse,
      this.userID,
      this.arrOrders,
      new Date()



    );
  
    if (this.arrDataOrder.length > 0) {
      adminOrders.id = this.arrDataOrder.splice(-1)[0].id + 1;
    }
    this.adminOrderService.postOrders(adminOrders).subscribe(() => {
      this.getOrderAdmin();
    });

    this.arrOrders = null;
    this.arrOrders = [];
    if (this.arrOrders.length == 0) {
      this.orderStatus = true;
    }


    this.updateLocalstorage()
    this.checkStatus()
    this.orderService.bag.next(this.arrOrders);
    localStorage.removeItem('products');
    this.router.navigate(['/home']);

  }

  private total() {
    this.totalPrice = this.arrOrders.reduce((total, elem) => {
      return total + (elem.productPrice * elem.count);
    }, 0);

  }
  private updateLocalstorage(): void {
    localStorage.setItem('products', JSON.stringify(this.arrOrders))
  }
  private checkStatus(): void {
    if (this.arrOrders.length > 0) {
      this.orderStatus = true;
    }
    else {
      this.orderStatus = false;
    }
  }
}

