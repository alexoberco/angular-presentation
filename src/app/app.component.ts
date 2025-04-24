// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService, CartItem } from './services/cart.service';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  userEmail = 'usuario@example.com';
  purchases$?: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  checkout() {
    const cart: CartItem[] = this.cartService.getItems();
    this.purchases$ = this.orderService.checkout(cart, this.userEmail);
    this.purchases$.subscribe(() => this.cartService.clearCart());
  }
}
