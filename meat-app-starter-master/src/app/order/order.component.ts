import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { RadioOption } from './../shared/radio/radio-option.model';
import { CartItem } from './../restaurants-details/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order-item.model';
import 'rxjs/add/operator/do';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  numberPattern = /^[0-9]*$/;

  delivery = 8;

  orderId: string;

  orderForm: FormGroup;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Refeição', value: 'REF' }
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      name: this.fb.control('', [ Validators.required, Validators.minLength(5) ]),
      email: this.fb.control('', [ Validators.required, Validators.pattern(this.emailPattern) ]),
      emailConfirmation: this.fb.control('', [ Validators.required, Validators.pattern(this.emailPattern) ]),
      address: this.fb.control('', [ Validators.required, Validators.minLength(5) ]),
      number: this.fb.control('', [ Validators.required, Validators.minLength(1), Validators.pattern(this.numberPattern) ]),
      complement: this.fb.control(''),
      paymentOption: this.fb.control('', [ Validators.required ])
    }, { validator: OrderComponent.equalsTo });
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNoMatch: true}
    }

    return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.removeItem(item);
  }

  checkOrder(order: Order) {
    order.orderItens = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService
      .checkOrder(order)
      .do((orderId: string) => {
        this.orderId = orderId
      })
      .subscribe(() => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear();
      })
  }

  isOrderCompleted() {
    return this.orderId !== undefined;
  }
}
