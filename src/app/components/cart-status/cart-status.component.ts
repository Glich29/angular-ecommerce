import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit, OnDestroy{

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.updateCartStatus();
    console.log('totalPrice: ' + this.totalPrice);
  }

  ngOnDestroy() {
    this.cartService.totalPrice.unsubscribe();
    this.cartService.totalQuantity.unsubscribe();
  }


  private updateCartStatus() {
    //subscribe to the Cart totalPrice
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data );
    //subscribe to the Cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
  }
}
