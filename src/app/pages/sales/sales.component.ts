import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { SalesService } from 'src/app/shared/services/sales.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Order } from 'src/app/shared/model/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  arrSales: Array<IProduct>;
  arrNew: Array<IProduct>;
  activeSaleBtn: number = 0;

  //fast buy=>
  modalStatus: boolean = false;
  view: IProduct;
  masSizeBollean: Array<boolean> = [];
  stausSizeBlock: boolean = false;
  isValue: number;
  productSize: string = '';
  sizeStatus: boolean = false;
  countProductOrder: number = 1;
  PriceSale: number;


  constructor(private saleService: SalesService,
    private prodService: ProductService,
    private orderService:OrderService,
    private router: Router,) { }
  name: string;
  ngOnInit(): void {
    this.getSale();
  }

  getSale(): void {
    this.saleService.getSale().subscribe(data => {
      this.arrSales = data;
    })

  }

  getMenSale(): void {
    this.saleService.getSaleMen().subscribe(data => {
      this.arrSales = data;
    })
    this.activeSaleBtn = 2;
   
  }
  getWomenSale(): void {
    this.saleService.getSaleWomen().subscribe(data => {
      this.arrSales = data;
    })
    this.activeSaleBtn = 1;
  }
  //modal fast bay
  checkModal(): void {
    this.modalStatus = false;
  }

  fastBay(id): void {
    (this.modalStatus == false ? this.modalStatus = true : this.modalStatus = false);
    this.prodService.getOneProduct(id).subscribe(
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
   

  }
  addBag(product: IProduct): void {
    let localStorageArr: Array<any> = [];
    if (product.sale == true) {
      this.PriceSale = product.productPrice - (product.productPrice * product.saleProcent / 100)
      // this.PriceSale= Math.round(this.PriceSale)
    }
    else {
      this.PriceSale = product.productPrice;
    }
   

    const orderProd: IOrder = new Order(1, product, this.PriceSale, this.productSize, this.countProductOrder)
    if (this.productSize == '') {
      this.sizeStatus = true;
    }
    if (this.productSize !== '' || this.stausSizeBlock == true) {
      this.sizeStatus = false;

      if (localStorage.length > 0 && localStorage.getItem('products')) {
        localStorageArr = JSON.parse(localStorage.getItem('products'));
        orderProd.id = localStorageArr.slice(-1)[0].id + 1;

        if (localStorageArr.some(prod => prod.product.id === product.id)) {
          const index = localStorageArr.findIndex(prod => prod.product.id == product.id);
          localStorageArr[index].count += this.countProductOrder;
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


}
