import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.listCartDetails();
  }


  private listCartDetails() {
    //get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    //compute cat total price and quantity
    this.cartService.computeCartTotals();
  }


  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  removeItem(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
