import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";
import {NgFor} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css',
  providers: [ProductService]
})
export class ProductCategoryMenuComponent implements OnInit{
  productCategories: ProductCategory[]=[];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.listProductCategories();
  }

  private listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        // console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
