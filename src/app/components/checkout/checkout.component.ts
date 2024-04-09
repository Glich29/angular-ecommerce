import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {EcommerceFormService} from "../../services/ecommerce-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {EComValidator} from "../../validators/ecom-validator";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";
import {Order} from "../../common/order";
import {OrderItem} from "../../common/order-item";
import {Purchase} from "../../common/purchase";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [EcommerceFormService, CheckoutService]
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private formService: EcommerceFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.viewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required, Validators.minLength(2), EComValidator.notOnlyWhitespace]),
        lastName: new FormControl('',
          [Validators.required, Validators.minLength(2),  EComValidator.notOnlyWhitespace]),
        email: new FormControl('',
            [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
          )
      }),
      shippingAddress: this.formBuilder.group(({
        street: new FormControl('',
          [Validators.required, Validators.minLength(2),  EComValidator.notOnlyWhitespace]),
        city: new FormControl('',
          [Validators.required, Validators.minLength(2),  EComValidator.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('',
          [Validators.required, Validators.minLength(2),  EComValidator.notOnlyWhitespace])
      })),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required, Validators.minLength(2),  EComValidator.notOnlyWhitespace]),
        city: new FormControl('',
          [Validators.required, Validators.minLength(2),  EComValidator.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('',
          [Validators.required, Validators.minLength(2),  EComValidator.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('',
          [Validators.required, Validators.minLength(2),  EComValidator.notOnlyWhitespace]),
        cardNumber: new FormControl('',[Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('',[Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });


    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
         console.log("Retrieved credit card months: " + JSON.stringify(data));
         this.creditCardMonths = data;
      }
    );
    //populate credit card years
    this.formService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    //populate countries
    this.formService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    )
  }

  // ngOnDestroy() {
  //   this.cartService.totalPrice.unsubscribe();
  //   this.cartService.totalQuantity.unsubscribe();
  // }

  viewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType')
  }

  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard')
  }

  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber')
  }

  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode')
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.get('expirationYear')?.value);

    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card month: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }

  copyShippingAddressToBillingAddress(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.get('billingAddress')?.setValue(this.checkoutFormGroup.get('shippingAddress')?.value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.get('billingAddress')?.reset();
      this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log("Handling form submission");
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity

    const cartItems = this.cartService?.cartItems;
    let orderItems: OrderItem[] = cartItems?.map(ci => new OrderItem(ci));

    let purchase = new Purchase();

    purchase.customer = this.checkoutFormGroup?.controls['customer']?.value;

    //shippingAddress
    purchase.shippingAddress = this.checkoutFormGroup?.controls['shippingAddress']?.value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));
    purchase.shippingAddress.state = shippingState?.name;
    purchase.shippingAddress.country = shippingCountry?.name;

    //billingAddress
    purchase.billingAddress = this.checkoutFormGroup?.controls['billingAddress']?.value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress?.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress?.country));
    purchase.billingAddress.state = shippingState?.name;
    purchase.billingAddress.country = shippingCountry?.name;

    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received. \nOrder tracking number: ${response?.orderTrackerNumber}`);
        //reset cart
        this.resetCart();
      },
      error: err => {
        alert(`There was an error: ${err.message}`)
      }
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    let country: Country = formGroup?.get('country')?.value;
    const countryCode = country.code;
    const countryName = country.name;
    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.formService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        //select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }

  private resetCart() {
    //reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice?.next(0);
    this.cartService.totalQuantity?.next(0);
    //reset the form
    this.checkoutFormGroup?.reset();
    //navigate to the products page

    this.router.navigateByUrl("/products")
  }
}
