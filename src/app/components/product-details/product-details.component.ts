import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [ProductService]
})
export class ProductDetailsComponent implements OnInit {

    product!: Product;
    constructor(private productService: ProductService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.route.paramMap.subscribe(() => {
        this.handleProductDetails();
      })
    }

  private handleProductDetails() {
    // get the 'id' param string. Convert string to a number using '+' symbol.
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }
}
