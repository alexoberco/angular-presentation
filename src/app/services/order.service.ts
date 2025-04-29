import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject, tap } from 'rxjs';
import { OrderRequest } from '../models/order-request';
import { Purchase } from '../models/purchase';
import { environment } from '../../enviroments/enviroment';
import { CartItem } from './cart.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = `${environment.apiUrl}/orders`;

  // Subject para exponer el último conjunto de pedidos confirmados
  private lastConfirmedSubject = new BehaviorSubject<Purchase[]>([]);
  public lastConfirmed$ = this.lastConfirmedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Envía un solo ítem y devuelve la compra generada
  placeOrder(request: OrderRequest): Observable<Purchase> {
    return this.http.post<Purchase>(this.base, request);
  }

  // Envía todo el carrito como múltiples pedidos y emite el resultado en lastConfirmed$
  checkout(cart: CartItem[], userEmail: string): Observable<Purchase[]> {
    const calls = cart.map(item => {
      const req: OrderRequest = {
        productId: item.product.id!,
        quantity: item.quantity,
        userEmail
      };
      return this.placeOrder(req);
    });
    return forkJoin(calls).pipe(
      tap(purchases => {
        // Actualiza el subject con las compras confirmadas
        this.lastConfirmedSubject.next(purchases);
      })
    );
  }
}
