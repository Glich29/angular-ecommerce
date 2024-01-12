import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {UtilsService} from '../../services/utils.service'
import {Product} from '../../common/product';
import {CommonModule, NgFor} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductService, UtilsService]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductService,
              public utilsService: UtilsService,
              private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    });

  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword')

    if (this.searchMode) {
      this.handleSearchProducts()
    } else {
      this.handleListProducts()
    }

  }

  handleListProducts() {
    //check if 'id' parameter is available.
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //get the 'id' string. convert string to a number.
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      //not Category id available then currentCategoryId=1
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  private handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
