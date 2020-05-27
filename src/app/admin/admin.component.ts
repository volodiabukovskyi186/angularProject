import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { IProduct } from '../shared/interfaces/product.interface';
import { Product } from '../shared/model/product.model';
import { ICategory } from '../shared/interfaces/category.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

 


  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  }
 

}
