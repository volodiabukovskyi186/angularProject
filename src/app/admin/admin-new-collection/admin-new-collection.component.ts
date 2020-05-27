import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { NewCollectionService } from 'src/app/shared/services/new-collection.service';

@Component({
  selector: 'app-admin-new-collection',
  templateUrl: './admin-new-collection.component.html',
  styleUrls: ['./admin-new-collection.component.scss']
})
export class AdminNewCollectionComponent implements OnInit {
  adminProduct: Array<IProduct> = [];
  adminNewColl: Array<IProduct> = [];

  constructor(private productService: ProductService,
    private newCollService: NewCollectionService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getCollData();
  }
  getProduct(): void {
    this.productService.getAdminCategor().subscribe(data => {
      this.adminProduct = data;
    })

  }
  getCollData(): void {
    this.newCollService.getNew().subscribe(data => {
      this.adminNewColl = data;
    })
  }

  newCollSet(item): void {
    if (item.newCollection == false && item.sale == false) {
      item.newCollection = true;
      this.newCollService.postNew(item).subscribe(() => {
        this.getCollData()
      })
    }

    else if (item.newCollection == true) {
      item.newCollection = false;
      this.newCollService.deleteNew(item).subscribe(() => {
        this.getCollData()
      })
    }
    this.productService.upDateProduct(item).subscribe(() => {
      this.getProduct();
    })

  }
}
