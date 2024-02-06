import {Component, OnInit, OnDestroy} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CurrencyPipe} from "@angular/common";
import {debounceTime, Subject, Subscription, takeUntil} from "rxjs";

const DEBOUNCE_TIME = 500;

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css',
  providers: [CartService]
})
export class CartStatusComponent implements OnInit, OnDestroy{

  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  private subscription1!: Subscription;

  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.cartService.totalQuantity.unsubscribe();
  }


  private updateCartStatus() {
    //subscribe to the Cart totalPrice
    this.subscription1 = this.cartService.totalPrice.subscribe(data => this.totalPrice = data );
    //subscribe to the Cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
  }
}
