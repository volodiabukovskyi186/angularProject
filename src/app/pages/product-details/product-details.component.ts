import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Order } from 'src/app/shared/model/order.model';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, style, } from '@angular/animations';
import { ISize } from 'src/app/shared/interfaces/size.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],

  animations: [
    trigger('mainPhoto', [
      transition('void => *',[
        style({ transform:'translateX(-100%)' , opacity: 0 }),
        animate('1000ms ease-in')
      ]),
    ]),
    trigger('mainText', [
      transition('void => *',[
        style({ transform:'translateX(100%)' , opacity: 0 }),
        animate('1000ms ease-in')
      ]),
    ]),
    
  ]
  
})
export class ProductDetailsComponent implements OnInit {
  view: IProduct;
  productSize: string = '';
  isValue: number;
  countProduct: number = 1;
  PriceSale: number;
  sizeStatus: boolean = false;
  sizeBlockStatus: boolean = false;
  xs: boolean;

  stausSizeBlock:boolean=false;
  masSizeBollean: Array<boolean> = []


  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // this.masSizeBollean.push(this.xs)

      }
    })
  }

  ngOnInit(): void {
    this.getMyProduct()
  }


  getMyProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getOneProduct(id).subscribe(
      data => {
        this.view = data;
        this.getSize()
      }
    );
  }
  getSize(): void {
    this.masSizeBollean.push(this.view.size.xs, this.view.size.s, this.view.size.m, this.view.size.l, this.view.size.xl, this.view.size.xxl)
   
    this.stausSizeBlock = this.masSizeBollean.every(elem => {
      return elem == false
    })
    console.log(this.stausSizeBlock);

  }


  chooseSize(value): void {
    if (value == 'xs') {
      this.isValue = 1;
    } else if (value == 's') {
      this.isValue = 2;
    } else if (value == 'm') {
      this.isValue = 3;
    } else if (value == 'l') {
      this.isValue = 4;
    } else if (value == 'xl') {
      this.isValue = 5;
    } else if (value == 'xxl') {
      this.isValue = 6;
    }
    this.productSize = value;

  }


  addBag(product: IProduct): void {
    let localStorageArr: Array<any> = [];
    if (product.sale == true) {

      this.PriceSale = product.productPrice - (product.productPrice * product.saleProcent / 100)
      // this.PriceSale= Math.round(this.PriceSale);
    }
    else {
      this.PriceSale = product.productPrice;
    }
    console.log(this.PriceSale);
    const orderProd: IOrder = new Order(1, product, this.PriceSale, this.productSize, this.countProduct)
    if (this.productSize == '') {
      this.sizeStatus = true;
    }
    if (this.productSize !== ''||this.stausSizeBlock==true) {
      this.sizeStatus = false;

      if (localStorage.length > 0 && localStorage.getItem('products')) {
        localStorageArr = JSON.parse(localStorage.getItem('products'));
        orderProd.id = localStorageArr.slice(-1)[0].id + 1;

        if (localStorageArr.some(prod => prod.product.id === product.id)) {
          const index = localStorageArr.findIndex(prod => prod.product.id == product.id);
          localStorageArr[index].count += this.countProduct;
          localStorageArr[index].orderSize += `,${this.productSize}`;

        }
        else {
          localStorageArr.push(orderProd);
        }
        localStorage.setItem('products', JSON.stringify(localStorageArr));
      }
      else {
        localStorageArr.push(orderProd);
        localStorage.setItem('products', JSON.stringify(localStorageArr));
      }
      this.orderService.bag.next(orderProd);

      this.router.navigate(['/orders']);
    }
  }


}
