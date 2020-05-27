import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { SalesService } from 'src/app/shared/services/sales.service';

@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.scss']
})
export class AdminSalesComponent implements OnInit {
  adminProduct: Array<IProduct>;
  adminSales: Array<IProduct>;
  saleStatus: boolean = false;



  constructor(private productService: ProductService,
    private salesService: SalesService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getSales();
  }
  getProduct(): void {
    this.productService.getAdminCategor().subscribe(data => {
      this.adminProduct = data;
      
    });
  }
  
  getSales(): void {
    this.salesService.getSale().subscribe(data => {
      this.adminSales = data;
    });
  }

  saleSet(item): void {
    debugger;
    if (item.sale == false && item.saleProcent > 0&&item.newCollection==false) {
      item.sale = true;
      this.salesService.setSale(item).subscribe(() => {
        this.getSales();
      });
    }
    else if (item.sale == true) {
      item.sale = false;
      item.saleProcent = 0;
      this.salesService.deleteSale(item).subscribe(() => {
        this.getSales();
      });
    }
  
    this.productService.upDateProduct(item).subscribe(() => {
      this.getProduct();
    });
  }



}
