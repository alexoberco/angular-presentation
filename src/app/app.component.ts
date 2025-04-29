// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService, CartItem } from './services/cart.service';
import { OrderService } from './services/order.service';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
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
