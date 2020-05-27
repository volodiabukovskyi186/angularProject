import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { IColor } from 'src/app/shared/interfaces/filterColors.interface';
import { ActivatedRoute, Event, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { bindCallback } from 'rxjs';
import { Options } from 'ng5-slider';
import { ISizeFilter } from 'src/app/shared/interfaces/sizeFilter.interface';
import { trigger, state, transition, animate, style, } from '@angular/animations';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Order } from 'src/app/shared/model/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],

  animations: [
    trigger('fade', [
      state('small', style({ height: '10px', opacity: 0 })),
      state('large', style({ display: 'block', height: '*', opacity: 1 })),
      transition('small=>large', animate('300ms ease-in')),
      transition('large=>small', animate('300ms ease-in'))
    ]),
    trigger('fade2', [
      state('small', style({  height: '0px', opacity: 0 })),
      state('large', style({ height: '*', opacity: 1 })),
      transition('small=>large', animate('500ms ease-in')),
      transition('large=>small', animate('500ms ease-in'))
    ]),
    trigger('product_picture', [
      transition('void => *',[
        style({ transform:'translateX(100%)' , opacity: 0 }),
        animate('1000ms ease-in')
      ]),
    ]),
    trigger('product_text', [
      transition('void => *',[
        style({ transform:'translateX(-100%)' , opacity: 0 }),
        animate('1000ms ease-in')
      ]),
    ])
  ]

})
export class ProductComponent implements OnInit {
  myAnimatiom: string = 'small';
  filterStatus = false;
  category: string;
  categoryImgStatus: boolean = false;
  one: any = [];
  countProduct: number = 9;
  maxPrice: number;
  filterWidth: number;
  view: IProduct;
  modalStatus: boolean = false;

  isValue: number;
  productSize: string = '';
  sizeStatus: boolean = false;
  countProductOrder: number = 1;
  PriceSale: number;

  masSizeBollean: Array<boolean> = [];
  stausSizeBlock: boolean = false;
  
  screenWidthStatus:boolean=false;
  pictureAnimate:string;

  arrProducts: Array<IProduct> = [];
  arrColors: Array<IColor> = [
    {
      id: 0,
      color: 'black',
      status: false
    },
    {
      id: 1,
      color: 'white',
      status: false
    },
    {
      id: 2,
      color: 'silver',
      status: false
    },
    {
      id: 3,
      color: 'green',
      status: false
    },
    {
      id: 4,
      color: 'blue',
      status: false
    },
    {
      id: 5,
      color: 'red',
      status: false
    },
    {
      id: 6,
      color: 'pink',
      status: false
    },
    {
      id: 7,
      color: 'yellow',
      status: false
    },
    {
      id: 8,
      color: 'violet',
      status: false
    },
    {
      id: 9,
      color: 'orange',
      status: false
    }
  ]
  arrSizeFilter: Array<ISizeFilter> = [
    {
      id: 0,
      size: 'xs',
      status: false
    },
    {
      id: 1,
      size: 's',
      status: false
    },
    {
      id: 2,
      size: 'm',
      status: false
    },
    {
      id: 3,
      size: 'l',
      status: false
    },
    {
      id: 4,
      size: 'xl',
      status: false
    },
    {
      id: 5,
      size: 'xxl',
      status: false
    },
  ]
  namePage: string;
  caheckColor: number;
  colorStasus: boolean = false;
  masColors: Array<string> = [];
  masSize: Array<string> = [];
  subName: any;
  //price slider=>
  value: number = 0;
  highValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 200

  };

  constructor(
    private prodService: ProductService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) {

    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        this.pictureAnimate='enter';
        this.countProduct = 9;
        const categoryName = this.activateRoute.snapshot.paramMap.get('category');
        this.getProducts(categoryName);
        if (categoryName == 'women') {
          this.categoryImgStatus = false;
        } else {
          this.categoryImgStatus = true;
        }

        this.namePage = categoryName;
        this.subName = this.prodService.dataSub$;
        this.prodService.dataSub$.subscribe(data => {
          this.arrProducts = data.filter(prod => prod.category.nameEN === this.namePage)
        })

      }
    }
    );
  }

  innerWidth: any;
  ngOnInit(): void {
    this.getProducts();


  }
  private getProducts(categoryName?: string): void {
    categoryName = categoryName || this.activateRoute.snapshot.paramMap.get('category');
    this.prodService.getProduct(categoryName, this.countProduct).subscribe(
      data => {
        this.arrProducts = data;
      }
    );
  }
  getSize(): void {
    this.masSizeBollean.push(this.view.size.xs, this.view.size.s, this.view.size.m, this.view.size.l, this.view.size.xl, this.view.size.xxl)

    this.stausSizeBlock = this.masSizeBollean.every(elem => {
      return elem == false;
    });
    console.log(this.stausSizeBlock);

  }

  moreNine(): void {
    this.countProduct += 9;
    this.getProducts();

  }

  filterBtn(): void {
    this.myAnimatiom = (this.myAnimatiom === 'small' ? 'large' : 'small')
    console.log(this.myAnimatiom);
    if (this.filterStatus == false) {
      this.filterStatus = true;
    } else {
      this.filterStatus = false;
    }

  }
  colorFilter(value): void {
    if (value.status == false) {
      value.status = true;
      this.masColors.push(value.color);
    } else if (value.status == true) {
      value.status = false;
      let findId = this.masColors.findIndex(elem => elem == value.color)
      this.masColors.splice(findId, 1);
    }
    this.prodService.getProdColor(this.masColors, this.namePage).subscribe(data => {
      this.arrProducts = data;
      console.log(this.arrProducts, this.masColors);
    });

  }
  priceFilter(): void {
    this.prodService.getPriceFilter(this.namePage, this.value, this.highValue).subscribe((data => {
      this.arrProducts = data;

      console.log(this.arrProducts);
    }))
  }
  sizeFilter(val): void {
   
    this.arrSizeFilter.forEach(elem=>{
      elem.status=false
    })
    val.status = true;
    let size=val.size

    this.prodService.getSizeFilter(this.namePage,size).subscribe(data => {
      this.arrProducts = data;
      console.log(this.arrProducts);
    });

  }
  onResize(event) {
    // console.log(event.currentTarget.innerWidth)
    if (event.currentTarget.innerWidth <= 768) {
    this.screenWidthStatus=true;
    }

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
        console.log(this.view)
      }
    );

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
      // this.PriceSale= Math.round(this.PriceSale)
    }
    else {
      this.PriceSale = product.productPrice;
    }
    console.log(this.PriceSale);

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
          console.log(localStorageArr);

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
      console.log(product, localStorageArr);
      this.router.navigate(['/orders']);
    }
  }


}
