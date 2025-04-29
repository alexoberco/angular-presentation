// src/app/components/product-list/product-list.component.ts
import { Component, OnInit }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule }         from '@angular/router';
import { FormsModule }          from '@angular/forms';        // ← Importa FormsModule
import { ProductService }       from '../../services/product.service';
import { CartService }          from '../../services/cart.service';
import { Product }              from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],           // ← AÑADE FormsModule
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  prices: Record<number,number> = { 1: 10, 2: 15.5, 3: 7.25 };
  quantities: Record<number, number> = {};
  addedMessage = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => this.products = data);
  }

  add(p: Product) {
    const qty = this.quantities[p.id!] ?? 1;
    const validQty = Math.min(qty, p.stock);
    this.cartService.addToCart(p, validQty);
    this.addedMessage = `${validQty} × ${p.name} añadido al carrito`;
    setTimeout(() => this.addedMessage = '', 3000);
  }

  priceOf(p: Product): number {
    return this.prices[p.id!] ?? 0;
  }
}
