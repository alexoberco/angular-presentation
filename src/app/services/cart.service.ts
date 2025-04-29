import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }               from '@angular/common';
import { Product }    from '../models/product';
import { BehaviorSubject } from 'rxjs';


export interface CartItem { product: Product; quantity: number; }

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'miCarrito';
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Determinar en tiempo de ejecución si estamos en navegador
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private load(): CartItem[] {
    // Solo accede a localStorage cuando se ejecute en cliente
    if (this.isBrowser) {
      const json = localStorage.getItem(this.storageKey);
      return json ? JSON.parse(json) : [];
    }
    // En SSR devolvemos siempre carrito vacío
    return [];
  }

  private save(items: CartItem[]) {
    if (this.isBrowser) {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
    // No hacemos nada en servidor
  }

  addToCart(product: Product, quantity = 1): void {
    const items = this.getItems();
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      items[idx].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.save(items);
  }
  
  getItems(): CartItem[] {
    return this.load();
  }

  clearCart() {
    this.save([]);
  }
}
