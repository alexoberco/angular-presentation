import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: CartItem[] = [];
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.items = this.cartService.getItems();
  }

  finalizeOrder() {
    const email = 'usuario@example.com';
    this.orderService.checkout(this.items, email).subscribe(() => {
      this.cartService.clearCart();
      // Navega a la confirmación pasando el carrito como estado
      this.router.navigate(['/order-confirmation'], {
        state: { confirmed: this.items }  // :contentReference[oaicite:3]{index=3}
      });
    });
  }
}