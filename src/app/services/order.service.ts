import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { OrderRequest } from '../models/order-request';
import { Purchase } from '../models/purchase';
import { environment } from '../../enviroments/enviroment';
import { CartItem } from './cart.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  // Envía un solo ítem
  placeOrder(request: OrderRequest): Observable<Purchase> {
    return this.http.post<Purchase>(this.base, request);
  }

  // Envía todo el carrito como múltiples pedidos
  checkout(cart: CartItem[], userEmail: string): Observable<Purchase[]> {
    const calls = cart.map(item => {
      const req: OrderRequest = {
        productId: item.product.id!,
        quantity: item.quantity,
        userEmail
      };
      return this.placeOrder(req);
    });
    return forkJoin(calls);
  }
}
