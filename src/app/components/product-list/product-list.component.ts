import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ProductService }    from '../../services/product.service';
import { CartService }       from '../../services/cart.service';
import { Product }           from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  prices: Record<number,number> = { 1: 10, 2: 15.5, 3: 7.25 };

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  add(p: Product) {
    this.cartService.addToCart(p);
  }

  priceOf(p: Product): number {
    return this.prices[p.id!] ?? 0;
  }
}
