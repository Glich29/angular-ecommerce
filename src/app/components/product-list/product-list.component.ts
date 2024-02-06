import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {UtilsService} from '../../services/utils.service'
import {Product} from '../../common/product';
import {CommonModule, NgFor, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";
import {CartStatusComponent} from "../cart-status/cart-status.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink, NgOptimizedImage, NgbPagination, CartStatusComponent],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductService, UtilsService, CartService]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  private previousCategoryId: number = 1;
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
              public utilsService: UtilsService,
              private cartService: CartService,
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

    //
    // Check if we have different category then previous
    // Note: Angular will reuse a component if it is currently being viewed

    //if we have a different category id then prev
    //then need to set thePageNumber = 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)


    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                                        this.thePageSize,
                                                        this.currentCategoryId).subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  private handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //If we have a different keyword than previous
    //then set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    console.log(`theKeyword=${theKeyword}, previousKeyword=${this.previousKeyword}`);

    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                              this.thePageSize,
                                              theKeyword).subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
