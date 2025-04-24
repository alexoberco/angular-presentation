import { Injectable } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];

  addToCart(product: Product): void {
    const item = this.items.find(i => i.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }
}
