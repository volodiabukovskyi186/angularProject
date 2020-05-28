import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ISubCategory } from 'src/app/shared/interfaces/subCategory.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { trigger, state, transition, animate, style, } from '@angular/animations';
import { Router, NavigationEnd, Event } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

  animations: [
    trigger('smallbar', [
      state('small', style({ width: '0vw', opacity: 0 })),
      state('large', style({ width: '50vw', opacity: 1 })),
      transition('large=>small', animate('300ms ease-in')),
      transition('small=>large', animate('300ms ease-in'))
    ]),
    trigger('smallBarText', [
      state('small', style({ display: 'none', opacity: 0 })),
      state('large', style({ display: 'inline-block', opacity: 1 })),
      transition('large=>small', animate('300ms ease-in')),
      transition('small=>large', animate('300ms ease-in'))
    ]),
    trigger('menSubMenu', [
      state('smallP', style({ width: '0vw', opacity: 0, })),
      state('largeP', style({ width: '50vw', opacity: 1 })),
      transition('largeP=>smallP', animate('300ms ease-in')),
      transition('smallP=>largeP', animate('300ms ease-in'))
    ]),
    trigger('womenSubMenu', [
      state('smallWomen', style({ width: '0vw', opacity: 0, })),
      state('largeWomen', style({ width: '50vw', opacity: 1 })),
      transition('largeWomen=>smallWomen', animate('300ms ease-in')),
      transition('smallWomen=>largeWomen', animate('300ms ease-in'))
    ]),
    trigger('navSubMenu', [
      state('close', style({ visibility:'hidden' , opacity: 0 })),
      state('open', style({ display:'flex',  opacity: 1 })),
      transition('open=>close', animate('300ms ease-in')),
      transition('close=>open', animate('300ms ease-in'))


      // state('close', style({ transform:'translateY(-100%)' , opacity: 0 })),
      // state('open', style({ transform:'translateY(50%)' ,  opacity: 1 })),
      // transition('open=>close', animate('300ms ease-in')),
      // transition('close=>open', animate('300ms ease-in'))
    ]),
    trigger('navSubMenuMen', [
      state('close', style({ visibility:'hidden' , opacity: 0 })),
      state('open', style({ display:'flex',  opacity: 1 })),
      transition('open=>close', animate('300ms ease-in')),
      transition('close=>open', animate('300ms ease-in'))

    ])

  ]


})
export class HeaderComponent implements OnInit {
  myAnimatiom: string = 'small';
  myAnimatiomP: string = 'smallP';
  mySubMen: string = 'smallP';
  mySubWomen: string = 'smallWomen';
  navSubMenuMen: string = 'close';
  navSubMenuWomen: string = 'close';
  width: any;
  burgerMenuStatus: boolean = false;
  isChangedBlock: boolean = false;
  isChangedBlockMan: boolean = false;
  getProduct: Array<IProduct> = [];
  SubCateg: Array<ISubCategory> = [];
  subBoolean: boolean = false;
  arrSubCateg: Array<IProduct> = [];
  checkLoginPage: any = 'login'
  singInStatus: boolean = false;
  singOutStatus: boolean = false;
  userId: string;
  smallMenStatus: boolean = false;
  smallWomenStatus: boolean = false;




  constructor(private orderService: OrderService,
    private subCategoryService: SubCategoryService,
    private prodService: ProductService,
    private authService: AuthService,
    private router: Router, ) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        console.log(this.checkLoginPage);
        this.myAnimatiom = 'small'
        this.burgerMenuStatus = false;

        if (localStorage.getItem('user')) {
          let local = JSON.parse(localStorage.getItem('user'));
          this.userId = local.id
          this.checkLoginPage = local.role;
          this.singOutStatus = true;
          console.log(this.singOutStatus);

        }
        else {
          this.singOutStatus = false;
        }
      }
    })


  
    // this.authService.singOutStatus.subscribe(data=>{
    //   this.singOutStatus=data;

    // })

  }


  public innerWidth: any;
  ngOnInit() {
    this.productLenth();
    this.getOrder();
    this.getSubCategory();


  }
  navSubMenu(): void {
    this.navSubMenuMen = (this.navSubMenuMen == 'close' ? 'open' : 'close');
    console.log(this.navSubMenuMen)
  }

  // mouseOver() {
  //   this.myAnimatiom = (this.myAnimatiom === 'small' ? 'large' : 'small')
  //   this.myAnimatiomP = (this.myAnimatiomP === 'smallP' ? 'largeP' : 'smallP')
  //   console.log(this.myAnimatiom)
  // }



  private getSubCategory(): void {
    this.subCategoryService.getSubCategory().subscribe(data => {
      this.SubCateg = data;
    });


  }
  subNameCateg(subName): void {
    this.prodService.getSubCategor(subName).subscribe(data => {

      this.arrSubCateg = data;
      this.prodService.dataSubCategory(this.arrSubCateg)

    });

  }

  private productLenth(): void {
    this.orderService.bag.subscribe(() => {
      this.getOrder()
    })
  }
  private getOrder(): void {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.getProduct = JSON.parse(localStorage.getItem('products'));

    }

  }

  barMenu(): void {
    this.myAnimatiom = (this.myAnimatiom === 'small' ? 'large' : 'small')

    if (this.burgerMenuStatus == false) {
      this.burgerMenuStatus = true;

    } else {
      this.burgerMenuStatus = false;
      this.mySubMen = 'smallP';
      this.mySubWomen = 'smallWomen'
    }
    console.log(this.burgerMenuStatus)


  }
  onResize(event) {
    if (event.currentTarget.innerWidth <= 768) {
      this.burgerMenuStatus = false;
    }


  }
  sinOut(): void {
    this.authService.logOut();
    this.singOutStatus = false



  }
  checkUser(): void {
    this.authService.login()

  }
  smallMen(): void {
    this.smallWomenStatus = false;
    // (this.mySubMen=='small' ?this.mySubMen='large' :this.mySubMen='small')
    if (this.mySubMen == 'smallP') {
      this.mySubMen = 'largeP'


    }
    else {
      this.mySubMen = 'smallP'
    }


    (this.smallMenStatus == false ? this.smallMenStatus = true : this.smallMenStatus = false)


  }
  smallWomen(): void {
    (this.mySubWomen == 'smallWomen' ? this.mySubWomen = 'largeWomen' : this.mySubWomen = 'smallWomen');

    this.smallMenStatus = false;
    (this.smallWomenStatus == false ? this.smallWomenStatus = true : this.smallWomenStatus = false)

  }
  smallMenWomen(): void {
    this.mySubMen = 'smallP';
    this.mySubWomen = 'smallWomen'
  }



}
