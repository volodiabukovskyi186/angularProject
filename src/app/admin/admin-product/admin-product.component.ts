import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/model/product.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ISize } from 'src/app/shared/interfaces/size.interface';
import { ISubCategory } from 'src/app/shared/interfaces/subCategory.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  adminCategory: Array<ICategory> = [];

  productStatus: boolean = false;
  upDateID: number;

  productCategory: ICategory = { id: 1, nameUA: 'women', nameEN: 'women' };
  adminProducts: Array<IProduct> = [];

  arrCategory: ICategory;
  arrSubCategory: Array<ISubCategory> = [];

  adminColors:Array<string>=['red','black','yellow','orange','pink','blue','white','green','silver','violet']


  checkSizeXS: boolean = false;
  checkSizeS: boolean = false;
  checkSizeM: boolean = false;
  checkSizeL: boolean = false;
  checkSizeXL: boolean = false;
  checkSizeXXL: boolean = false;


  categoryName: string;


  productSubCategory: ISubCategory = { id: 1, subName: 'T-shirt' }
  productPrice: number;
  productDescribe: string;

  subCategoryName: string;
  productColor: string;
  productNewCol: boolean = false;
  productSize: ISize = {
    xs: this.checkSizeXS,
    s: this.checkSizeS,
    m: this.checkSizeM,
    l: this.checkSizeL,
    xl: this.checkSizeXL,
    xxl: this.checkSizeXXL,
  }
  // { xs: false, s: true, m: true, l: true, xl: true, xxl: true }
  productSales: boolean = false;

  productImgIN:string;
  productImg: string;
// fireStor=>
uploadProgress: Observable<number>;

  constructor(private prodService: ProductService,
    private categoryService: CategoryService,
    private subCategoryServe: SubCategoryService,
    private afStorage: AngularFireStorage
  ) { }
 


  ngOnInit(): void {
    this.getCategory();
    this.getProduct();
    this.getSubCatego();
  }
  private getCategory(): void {
    this.categoryService.getCategory().subscribe(
      data => {
        this.adminCategory = data;
      });
  }
  private getProduct(): void {
    this.prodService.getAdminCategor().subscribe(
      data => {
        this.adminProducts = data;
      }
    );
  }
  private getSubCatego(): void {
    this.subCategoryServe.getSubCategory().subscribe(data => {
      this.arrSubCategory = data;
    })
  }

  setCategory(): void {
    const index = this.adminCategory.findIndex(elem => elem.nameEN.toLowerCase() === this.categoryName.toLowerCase());
    this.productCategory = this.adminCategory[index];
  }
  setSubCategory(): void {
    const index = this.arrSubCategory.findIndex(elem => elem.subName.toLowerCase() === this.subCategoryName.toLowerCase());
    this.productSubCategory = this.arrSubCategory[index];
  }
  addProduct(): void {
    console.log(this.checkSizeXS, this.checkSizeS)
    const product: IProduct = new Product(1,
      this.productCategory,
      this.productSubCategory,
      this.productPrice,
      this.productDescribe,
      this.productColor,
      { xs: this.checkSizeXS, s: this.checkSizeS, m: this.checkSizeM, l: this.checkSizeL, xl: this.checkSizeXL, xxl: this.checkSizeXXL, },
      this.productSales, this.productNewCol,0,this.productImg);

    if (!this.productStatus) {
      if (this.adminProducts.length > 0) {
        product.id = this.adminProducts.slice(-1)[0].id + 1;

      }
      this.prodService.setProduct(product).subscribe(() => {
        this.getProduct();
      });
      this.productStatus = false;
    }
    else {
      product.id = this.upDateID;
      this.prodService.upDateProduct(product).subscribe(() => {
        this.getProduct();
      });
      this.productStatus = false;
    }
  }


  delProduct(product): void {
    this.prodService.deleteProduct(product).subscribe(() => {
      this.getProduct();
    })

  }

  upDateProduct(product: IProduct): void {
 
    this.upDateID = product.id;
    this.categoryName=product.category.nameEN
    this.subCategoryName = product.subcategory.subName;
    this.productPrice = product.productPrice;
    this.productDescribe = product.describe;
    this.productColor = product.color;
    this.productSize = {
      xs: this.checkSizeXS,
      s: this.checkSizeS,
      m: this.checkSizeM,
      l: this.checkSizeL,
      xl: this.checkSizeXL,
      xxl: this.checkSizeXXL,
    }
    this.productStatus = true;
    // this.productImg = product.img;
   console.log(this.categoryName)
  }


  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress=task.percentageChanges();
    task.then(e=>{
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url=>{
        this.productImg=url;
    })
    })
  }
 uuid():string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}




}
