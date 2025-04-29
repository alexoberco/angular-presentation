// src/app/components/order-confirmation/order-confirmation.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { HeaderComponent }   from '../header/header.component';
import { Purchase }          from '../../models/purchase';
import { OrderService }      from '../../services/order.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  confirmed: Purchase[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    // Nos suscribimos al último pedido
    this.orderService.lastConfirmed$.subscribe(purchases => {
      this.confirmed = purchases;
    });
  }
}
